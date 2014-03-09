
if (Meteor.isClient) {
    Products = new Meteor.Collection("products");

    Template.products.items = function(){
        return Products.find({},{sort:{'createdOn':-1}});
    };

    Template.addreclamation.events({
        'click input.add-question' : function(event){
            event.preventDefault();
            var product = document.getElementById("product").value;
            var reclamation = document.getElementById("reclamation").value;
            var tags = document.getElementById("tags").value.split(" ");
            Meteor.call("addReclamation",product, reclamation, tags, function(error , id){
                console.log('added reclamation with Id .. '+id);
            });
            document.getElementById("product").value = "";
            document.getElementById("tags").value = "";
            document.getElementById("reclamation").value = "";
        }
    });
}

if (Meteor.isServer) {


    Products = new Meteor.Collection("products");

    Meteor.startup(function () {
        // code to run on server at startup
    });

    Meteor.methods({
        addReclamation : function(product, reclamation, tags){
            console.log('Adding Reclamation');
            var id = Products.insert({
                'product' : product,
                'tags' : tags,
                'reclamation' : reclamation,
                'createdOn': new Date(),
                'userId' : Meteor.userId()
            });
            return id;
        }
    });

  Meteor.startup(function () {
      if (Products.find().count() === 0) {
          Products.insert({product: "iPhone 5S", reclamation: "It sucks", tags: [ "Apple", "iPhone 5S", "iOS" ], createdOn: new Date()});
          Products.insert({product: "iPhone 5C", reclamation: "It sucks", tags: [ "Apple", "iPhone 5C", "iOS" ], createdOn: new Date()});
          Products.insert({product: "iPhone 4", reclamation: "It sucks", tags: [ "Apple", "iPhone 4", "iOS" ], createdOn: new Date()});
      }
    // code to run on server at startup
  });
}
