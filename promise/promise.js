// A Promise is used to handle asynchronous operations. It promises to return a result later, either successfully or with an error....

// function downloadFile() {
//   return new Promise((resolve) => {
//     console.log("Downloading file...");

//     setTimeout(() => {
//       resolve("Download completed");
//     }, 2000);
//   });
// }

// downloadFile().then((message) => {
//   console.log(message);
// });

// //login
// function login() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Login Successful");
//     }, 1000);
//   });
// }

// function getUser() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ id: 101, name: "Ankit" });
//     }, 1000);
//   });
// }

// function getOrders(userId) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(["Laptop", "Phone"]);
//     }, 1000);
//   });
// }

// login()
//   .then((message) => {
//     console.log(message);
//     return getUser();
//   })
//   .then((user) => {
//     console.log(user);
//     return getOrders(user.id);
//   })
//   .then((orders) => {
//     console.log(orders);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     console.log("Finished");
//   });

function getProducts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = true;

      if (success) {
        resolve([
          { id: 1, name: "Laptop", categoryId: 101 },
          { id: 2, name: "Phone", categoryId: 102 },
        ]);
      } else {
        reject("Failed to fetch products");
      }
    }, 1000);
  });
}

function getCategory(categoryId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = true;

      if (success) {
        resolve({
          id: categoryId,
          name: "Electronics",
        });
      } else {
        reject("Category not found");
      }
    }, 2000);
  });
}

function getOffers(categoryId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = true;

      if (success) {
        resolve(["10% OFF", "Free Delivery", "Extra ₹1000 Cashback"]);
      } else {
        reject("No offers available");
      }
    }, 1500);
  });
}

getProducts()
  .then((products) => {
    console.log("Products:", products);

    const categoryPromise = getCategory(products[0].categoryId);
    const offerPromise = getOffers(products[0].categoryId);

    // Promise.all()
    Promise.all([categoryPromise, offerPromise])
      .then(([category, offers]) => {
        console.log("\nPromise.all()");
        console.log("Category:", category);
        console.log("Offers:", offers);
      })
      .catch((err) => console.log("Promise.all Error:", err));

    // Promise.allSettled()
    Promise.allSettled([categoryPromise, offerPromise]).then((result) => {
      console.log("\nPromise.allSettled()");
      console.log(result);
    });

    // Promise.race()
    Promise.race([categoryPromise, offerPromise])
      .then((result) => {
        console.log("\nPromise.race()");
        console.log(result);
      })
      .catch((err) => console.log(err));

    // Promise.any()
    Promise.any([categoryPromise, offerPromise])
      .then((result) => {
        console.log("\nPromise.huany()");
        console.log(result);
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("\nFinished");
  });