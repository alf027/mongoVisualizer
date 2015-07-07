/**
 * Created by Alfano on 7/7/15.
 */
var objArr = []
var obj = {};
docs.foreach(function(e) {
  for(var prop in e) {
    obj.prop = prop;
    obj.val = e[prop];
    objArr.push(obj)
  }
});