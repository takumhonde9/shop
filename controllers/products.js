const { ProductService } = require("../services");

exports.getAddProduct = (req, res) => {
  res.render(
    "admin/add-products",
    {
      pageTitle: "Add Products",
      path: "/admin/add-product"
    }
  );
};

exports.postAddProducts = async (req, res) => {
  const {
    title,
    imageUrl,
    price,
    description
  } = req.body;
 
  const isAdded = await ProductService.create({
    title,
    description,
    price,
    imageUrl
  });

  if(isAdded) {
    res.redirect("/admin/products");
  }
};

exports.getProducts = async (req, res) => {
  const products = await ProductService.fetchAll()
    .catch(e => {
      console.log(e);
    })
  res.render(
    "shop/product-list",
    {
      products,
      pageTitle: "Products",
      path: "/products"
    }
  );
}

exports.getProduct = async (req, res) => {
  const { productID } = req.params;
  const product = await ProductService.findById(productID)
    .catch(e => {
      console.log(e);
    });
  res.render(
    "shop/product",
    {
      product: product,
      pageTitle: product.title,
      path: "/products"
    }
  );
}

exports.getAdminProducts = async (req, res) => {
  const products = await ProductService.fetchAll()
  .catch(e => {
    console.log(e);
  });
  res.render(
    "admin/product-list",
    {
      products,
      pageTitle: "Admin Products",
      path: "/admin/products"
    }
  );
}

exports.getEditProduct = async (req, res) => {
  const { edit } = req.query;
  const { productID } = req.params;
  if (!edit || !productID) {
    return res.redirect("/");
  }
  const product = await ProductService.findById(productID)
    .catch(e => {
      console.log(e);
    })
  if (!product) {
    // need to have an error div showing 
    res.redirect("/");
  }
  res.render(
    "admin/edit-product",
    {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: edit === "true" ? true : false,
      product: product
    }
  );
};

exports.postEditProduct = async (req, res) => {
  const {
    productID,
    title,
    imageUrl,
    price,
    description
  } = req.body;
  const isUpdated =  await ProductService.update(
    { 
      title, 
      imageUrl, 
      price,
      description
    },
    { 
      where: { 
        id: productID 
      }
    }
  )
    .catch(e => console.error(e));
  
  if(isUpdated)
    res.redirect("/admin/products");
}

exports.getDeleteProduct = async (req, res) => {
  const { productID } = req.body;
  const isDeleted = await ProductService.deleteWhere
    ({
      where: {
        id: productID
      }
    })
    .catch(e => {
      console.error(e);
    });
  if (isDeleted)
    res.redirect("/admin/products");
}