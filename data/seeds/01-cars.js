exports.seed = function(knex) {
  // Truncates ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          VIN: "YS3DD78N4X7055320",
          make: "Alfa Romeo",
          model: "4C",
          mileage: 12000.0,
          transmissionType: "Automatic",
          status: ""
        },
       
      ]);
    });
};
