'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('elixir:app', function () {
  before(function (done) {
	  var prompts = { 
		  pkgName: 'expackage',
		  pkgDescription: 'A example of a elixir package',
		  pkgVersion: '0.1.0',
		  authorName: 'Christopher EnyTC',
		  authorEmail: 'chris.enytc@icloud.com',
		  userName: 'chrisenytc',
		  license: 'MIT',
		  confirm: true
	  };
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts(prompts)
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'mix.exs',
      'config/config.exs',
      'lib/expackage.ex',
	  'test/expackage_test.exs',
      'test/test_helper.exs',
	  '.travis.yml',
	  '.gitignore',
	  'README.md',
	  'LICENSE',
	  'CONTRIBUTING.md',
	  'CHANGELOG'
    ]);
  });
});
