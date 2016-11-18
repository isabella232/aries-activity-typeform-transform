import { singleS3StreamInput, singleS3StreamOutput, Activity, createLogger } from 'aries-data';
import map from 'through2-map';
import _ from 'highland';

export default class TypeFormTransform extends Activity {
    static props = {
        name: require('../package.json').name,
        version: require('../package.json').version
    };

    @singleS3StreamInput('json')
    @singleS3StreamOutput('json')
    async onTask(activityTask, config) {
        return _(this.transformObject(activityTask.input.file)).flatten();
    }

    transformObject(stream) {
        return stream.pipe(map.obj(::this.getResponses));
    }

    /*
    *  Returns array of objects for each survey with key/values set as question/answer values.
    *  @param {array} questions - Array of question objects.
    *  @param {array} responses - Array of response objects.
    */
    getResponses({ questions, responses }) {
        // Get answers
        const answers = responses.map(({ answers }) => { return answers });

        // Filter out characters and make questions unique for mapping answers
        const sanitizedQuestions = questions.map(({ question, id }) => {
            return { id, question: this.replaceQuestionString(question) }
        });

        // Map questions to answers
        const mappedAnswers = answers.map((answer) => { return this.mapAnswerWithQuestions(answer, sanitizedQuestions) });
        return mappedAnswers;
    }

    /*
    *  Returns object with key/value set as question/answer
    *  @param {string} answer - Answer to a unique question.
    *  @param {array} questions - Array of questions with ID's and question string.
    */
    mapAnswerWithQuestions(answer, questions) {
        let obj = {};
        let index = 0;
        Object.keys(answer).reduce( (previous, key) => {
            // key is the question id
            const question = questions.find((question) => { return question.id === key });
            const value = answer[key];

            // If answer isn't undefined or if obj already has question with undefined answer
            if (value && obj.hasOwnProperty(question.question)) {
                Object.assign(obj, { [`${question.question}_${index}`] : value });
                index++;
            } else if (value && !obj.hasOwnProperty(question.question)) {
                Object.assign(obj, { [question.question] : value });
                index = 0;
            }
        }, 0);

        return { ...obj, timestamp : new Date() };
    }

    /*
    *  Returns question string with ommitted punctuation.
    *  @param {string} questionString - The raw question string.
    */
    replaceQuestionString(questionString) {
        return questionString.replace(/'s/g, ' is')
        .replace(/'t/g, ' not')
        .replace(/ /g, '_')
        .replace(/\?/g, '')
        .replace(/\./g, '')
        .toLowerCase();
    }
};

