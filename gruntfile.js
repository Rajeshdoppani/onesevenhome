module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/controllers/login.js','js/controllers/vendorlogin.js','js/controllers/registration.js','js/controllers/vendorregistration.js','js/controllers/forgetpassword.js','js/controllers/newpassword.js','js/controllers/dashboard.js','js/controllers/contact.js','js/controllers/services.js','js/controllers/detailservices.js','js/controllers/todaydeals.js','js/controllers/productpage.js','js/controllers/productlist.js','js/controllers/myaccount.js','js/controllers/cart.js','js/controllers/delivery.js','js/controllers/payment.js','js/controllers/viewmsg.js','js/controllers/paymentsuccess.js','js/controllers/activateuser.js','js/controllers/confirm.js','js/controllers/profile.js','js/controllers/postrequire.js','js/controllers/arcproduct.js','js/controllers/mechinerylist.js','js/controllers/wallpaperlist.js','js/controllers/wallpaperdetails.js','js/controllers/subscribed.js','js/controllers/buysell.js','js/controllers/buyprolist.js','js/controllers/buysellproductpage.js','js/controllers/orderconfirmation.js','js/controllers/orderfailure.js', 'js/controllers/usertermsconditions.js', 'js/controllers/comingsoon.js', 'js/controllers/aboutus.js'],
        dest: 'dist/main.min.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/main.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
	cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      combine: {
        files: {
          'dist/main.min.css': ['css/style.css', 'css/style1.css', 'css/home-page1.css', 'css/post-requirement.css', 'css/responsive.css', 'css/inner-responsive.css', 'css/myaccount.css']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js','js/controllers/login.js','js/controllers/vendorlogin.js','js/controllers/registration.js','js/controllers/vendorregistration.js','js/controllers/forgetpassword.js','js/controllers/newpassword.js','js/controllers/dashboard.js','js/controllers/contact.js','js/controllers/services.js','js/controllers/detailservices.js','js/controllers/todaydeals.js','js/controllers/productpage.js','js/controllers/productlist.js','js/controllers/myaccount.js','js/controllers/cart.js','js/controllers/delivery.js','js/controllers/payment.js','js/controllers/viewmsg.js','js/controllers/paymentsuccess.js','js/controllers/activateuser.js','js/controllers/conform.js','js/controllers/profile.js','js/controllers/postrequire.js','js/controllers/arcproduct.js','js/controllers/mechinerylist.js','js/controllers/wallpaperlist.js','js/controllers/wallpaperdetails.js','js/controllers/subscribed.js','js/controllers/buysell.js','js/controllers/buyprolist.js','js/controllers/buysellproductpage.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify', 'cssmin']);

};