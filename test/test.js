import test from 'blue-tape';
import TypeFormSource from '../lib/index.js';
import config from './test-config';
import fs from 'fs';
import _ from 'highland';

test('proper configuration', t => {
    const activity = new TypeFormSource();
    t.equal(TypeFormSource.props.name, require('../package.json').name);
    t.equal(TypeFormSource.props.version, require('../package.json').version);
    t.end();
});

test('test data', async (t) => {
	const source = new TypeFormSource();
	const stream = fs.createReadStream('test/fixtures/testData.json');
	const highlandStream = _(stream).split().map(JSON.parse).errors(err => {});
	const data = await source.handleStream(highlandStream);
	t.comment(JSON.stringify(data));
});