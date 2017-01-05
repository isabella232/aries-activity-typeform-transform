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

    /*
     * Returns stream with array of key/values set as question/answers
     * @param {stream} stream - Stream of incoming objects
     */
    transformObject(stream) {
        return stream.pipe(map.obj(::this.getResponses));
    }

    /*
    *  Returns array of objects for each survey with key/values set as question/answer values.
    *  @param {array} questions - Array of question objects.
    *  @param {array} responses - Array of response objects.
    */
    getResponses({ questions, responses }) {
        // Get answers and metadata
        const answers = responses.map(({ answers }) => { return answers });
        const metadata = responses.map(({ metadata }) => { return metadata });

        // Filter out characters and make questions unique for mapping answers
        const sanitizedQuestions = questions.map(({ question, id }) => {
            return { id, question: this.replaceQuestionString(question) }
        });

        // Map questions to answers. responses and metadata will be indexed the same so when returning full question/answer object
        // add the index of the object for metadata
        const mappedAnswers = answers.map((answer, index) => { return this.mapAnswerWithQuestions(answer, sanitizedQuestions, metadata, index) });
        return mappedAnswers;
    }

    /*
    *  Returns object with key/value set as question/answer
    *  @param {Object} answer - Answer to a unique question.
    *  @param {array} questions - Array of questions with ID's and question string.
    *  @param {array} meta - Metadata based on each user.
    *  @param {integer} metaIndex - Index to iterate through metadata.
    */
    mapAnswerWithQuestions(answer, questions, meta, metaIndex) {
        let obj = {};
        Object.keys(answer).reduce( (previous, key) => {
            // key is the question id
            const question = questions.find((question) => { return question.id === key });
            const value = answer[key];
            const questionIdArray = question.id.split('_');
            const multipleAnswers = questionIdArray.includes('choice') && questionIdArray.length === 4;

            // If answer isn't undefined or if obj already has question with undefined answer
            if (value && multipleAnswers) {
                Object.assign(obj, { [`${question.question}_${questionIdArray[3]}`] : value });
            } else if (value && !obj.hasOwnProperty(question.question)) {
                Object.assign(obj, { [question.question] : value });
            }
        }, 0);

        return { ...obj,
          timestamp : new Date(),
          date_land: meta[metaIndex].date_land,
          date_submit: meta[metaIndex].date_submit,
          user_agent: meta[metaIndex].user_agent
        };
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

