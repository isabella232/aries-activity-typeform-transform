import TypeformTransform from '../lib/index.js';
import omit from 'lodash.omit';
import responseObject from './fixtures/testData.json';
import mappedArray from './fixtures/mapped.json';
import chai from 'chai';
import isEqual from 'lodash.isequal';
const assert = chai.assert;

describe('Typeform Transform', () => {
  it('Array of mapped questions and answers', (done) => {
    const source = new TypeformTransform();
    const responses = source.getResponses(responseObject);
    const mapped = responses.map((obj) => omit(obj, 'timestamp'));
    assert(isEqual(JSON.stringify(mapped), JSON.stringify(mappedArray)), 'Questions and answers arrays do not match');
    done();
  });

  it('Map individual answer to question from array', (done) => {
    const source = new TypeformTransform();
    const answer = {
      listimage_23566421_choice: 'Female'
    }
    const meta = [responseObject.responses[0].metadata];
    const mappedQuestionAnswer = source.mapAnswerWithQuestions(answer, responseObject.questions, meta, 0);
    const omittedResponse = omit(mappedQuestionAnswer, 'timestamp');
    const expectedResponse = {
      'What is your gender?': 'Female',
      'date_land':'2016-06-02 21:04:34',
      'date_submit':'2016-06-02 21:04:58',
      'user_agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
    };
    assert(isEqual(JSON.stringify(omittedResponse), JSON.stringify(expectedResponse)), 'Individual mappings do not match');
    done();
  });
});

