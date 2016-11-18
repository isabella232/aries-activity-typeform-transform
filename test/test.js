import test from 'blue-tape';
import TypeformTransform from '../lib/index.js';
import config from './test-config';
import fs from 'fs';
import _ from 'highland';
import omit from 'lodash.omit';
import responseObject from './fixtures/testData.json';
import mappedArray from './fixtures/mapped.json';

test('proper configuration', t => {
    const activity = new TypeformTransform();
    t.equal(TypeformTransform.props.name, require('../package.json').name);
    t.equal(TypeformTransform.props.version, require('../package.json').version);
    t.end();
});

test('Array of mapped questions and answers', t => {
    const source = new TypeformTransform();
    const responses = source.getResponses(responseObject);
    const mapped = responses.map((obj) => omit(obj, 'timestamp'));
    t.equal(JSON.stringify(mapped), JSON.stringify(mappedArray));
    t.end();
});

test('Map individual answer to question from array', t => {
    const source = new TypeformTransform();
    const answer = {
        listimage_23566421_choice: 'Female'
    }
    const mappedQuestionAnswer = source.mapAnswerWithQuestions(answer, responseObject.questions);
    const omittedResponse = omit(mappedQuestionAnswer, 'timestamp');
    const expectedResponse = {
        'What is your gender?': 'Female'
    };
    t.equal(JSON.stringify(omittedResponse), JSON.stringify(expectedResponse));
    t.end();
});
