(function(){
  var app = angular.module("calculator", []);

  app.controller("MainController", MainController);
  app.filter("HTMLFilter", HTMLFilter);
  
  MainController.$inject = [];
  
  function MainController() {
    var ctrl = this;
    ctrl.stack = [0];
    
    ctrl.ops = [
      {
        id: 7,
        value: "7",
        function: "addToStack(7)"
      },
      {
        id: 8,
        value: "8",
        function: "addToStack(8)"
      },
      {
        id: 9,
        value: "9",
        function: "addToStack(9)"
        
      },
      {
        id: "&divide;",
        value: "&divide;",
        function: "addToStack('d')"
      },
      {
        id: 4,
        value: "4",
        function: "addToStack(4)",
      },
      {
        id: 5,
        value: "5",
        function: "addToStack(5)"
      },
      {
        id: 6,
        value: "6",
        function: "addToStack(6)"
      },
      {
        id: "&times;",
        value: "&times;",
        function: "addToStack('m')"
      },
      {
        id: 1,
        value: "1",
        function: "addToStack(1)"
      },
      {
        id: 2,
        value: "2",
        function: "addToStack(2)"
      },
      {
        id: 3,
        value: "3",
        function: "addToStack(3)"
      },
      {
        id: "-",
        value: "-",
        function: "addToStack('s')"
      },
      {
        id: 0,
        value: "0",
        function: "addToStack(0)"
      },
      {
        id: ".",
        value: ".",
        function: "addToStack('.')"
      },
      {
        id: "=",
        value: "=",
        function: "evalStack()"
      },
      {
        id: "+",
        value: "+",
        function: "addToStack('a')"
      }
      
    ];
    
    ctrl.addToStack = function(a) {
      if(typeof a === 'number') {
        var num = ctrl.stack.pop();
        if(typeof num === 'number') {
          num = num * 10 + a;
          ctrl.stack.push(num);
        } else {
          num = [num, a];
          var stack = ctrl.stack;
          ctrl.stack = stack.concat(num);
          
          //ctrl.stack.concat(num);
          
        }
          
        
        
      } else if (a === '=') {
        ctrl.evalStack();
      } else {
        ctrl.stack.push(a);
      }
      
      
    };
    
    ctrl.evalStack = function() {
      console.log("Eval Stack!");
      
      var stack = ctrl.stack.map(function(item){
        if(item === "&divide;") {
          return "/";
        } else if(item === "&times;") {
          return "*";
        } else {
          return item;
        }
      });
      
      ctrl.stack = [eval(stack.join(""))];
      
      
    };
    
    ctrl.allClear = function() {
      ctrl.stack = [0];
    };
    
    ctrl.clearOne = function() {
      if(ctrl.stack.length === 1) {
        ctrl.allClear();
      } else {
        ctrl.stack.pop();  
      }
      
    };
    
    ctrl.keyPressed = function(a) {
      console.log(a);
    };
    
  }
  
  HTMLFilter.$inject = ['$sce'];
  
  function HTMLFilter($sce) {
    return function(text) {
      return $sce.trustAsHtml(text);
    };
  }
  
})();