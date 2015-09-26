'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var _ = require('lodash');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Elixir') + ' generator!'
    ));

	function format(string) {
		var username = string.toLowerCase();
		return username.replace(/\s/g, '');
	}

	var defaults = (function () {
		var workingDirName = path.basename(process.cwd()); 
		var homeDir; 
		var osUserName; 
		var configFile;
		var user = {};

		if (process.platform === 'win32') {
			homeDir = process.env.USERPROFILE;
			osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
		}
		else {
			homeDir = process.env.HOME || process.env.HOMEPATH;
			osUserName = homeDir && homeDir.split('/').pop() || 'root';
		}

		configFile = path.join(homeDir, '.gitconfig');

		if (require('fs').existsSync(configFile)) {
			user = require('iniparser').parseSync(configFile).user;
		}

		return {
			pkgName: workingDirName,
			userName: format(user.name || osUserName || ''),
			authorName: user.name || '',
			authorEmail: user.email || ''
		};
	})();

    var prompts = [{
        name: 'pkgName',
        message: 'What\'s the package name?',
        default: defaults.pkgName
    }, {
        name: 'pkgDescription',
        message: 'What\'s the description?'
    }, {
        name: 'pkgVersion',
        message: 'What\'s the package version?',
        default: '0.1.0'
    }, {
        name: 'authorName',
        message: 'What\'s your name?',
        default: defaults.authorName
    }, {
        name: 'authorEmail',
        message: 'What\'s your email?',
        default: defaults.authorEmail
    }, {
        name: 'userName',
        message: 'What\'s your github username?',
        default: defaults.userName
    }, {
        type: 'list',
        name: 'license',
        message: 'Choose your license type',
        choices: ['MIT', 'BSD'],
        default: 'MIT'
    }, {
        type: 'confirm',
        name: 'confirm',
        message: 'Continue?',
        default: false
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
	  this.props.pkgSlugName = _s.slugify(this.props.pkgName);
	  this.props.pkgCapitalizedName = _s.capitalize(this.props.pkgName);
	  var d = new Date();
	  this.props.year = d.getFullYear();
	  this.props.date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
	  if(!this.props.confirm) {
		  return process.exit(0);
	  }
      done();
    }.bind(this));
  },

  configuring: {
	  enforceFolderName: function () {
		  if (this.props.pkgSlugName !== _.last(this.destinationRoot().split(path.sep))) {
			  this.destinationRoot(this.props.pkgSlugName);
		  }

		  this.config.save();
	  }
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_mix.exs'),
        this.destinationPath('mix.exs'),
		this.props
      );
      this.fs.copyTpl(
        this.templatePath('config/_config.exs'),
        this.destinationPath('config/config.exs'),
		this.props
      );
	  this.fs.copyTpl(
        this.templatePath('lib/_pkgName.ex'),
        this.destinationPath('lib/' + this.props.pkgSlugName + '.ex'),
		this.props
      );
	  this.fs.copyTpl(
        this.templatePath('test/_test_helper.exs'),
        this.destinationPath('test/test_helper.exs'),
		this.props
      );
	  this.fs.copyTpl(
        this.templatePath('test/_pkgName_test.exs'),
        this.destinationPath('test/' + this.props.pkgSlugName + '_test.exs'),
		this.props
      );
    },

    projectfiles: function () {
      this.fs.copyTpl(
        this.templatePath('travis.yml'),
        this.destinationPath('.travis.yml'),
		this.props
      );
      this.fs.copyTpl(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore'),
		this.props
      );
	  this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
		this.props
      );
	  if(this.props.license == 'MIT') {
		  this.fs.copyTpl(
			  this.templatePath('_LICENSE_MIT'),
			  this.destinationPath('LICENSE'),
			  this.props
		  );
	  } else {
		  this.fs.copyTpl(
			  this.templatePath('_LICENSE_BSD'),
			  this.destinationPath('LICENSE'),
			  this.props
		  );
	  }
	  this.fs.copyTpl(
        this.templatePath('_CONTRIBUTING.md'),
        this.destinationPath('CONTRIBUTING.md'),
		this.props
      );
	  this.fs.copyTpl(
        this.templatePath('_CHANGELOG'),
        this.destinationPath('CHANGELOG'),
		this.props
      );
    }
  }
 
});
