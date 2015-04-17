Ascii Warehouse (Angular infinite scroll)
====

This is an ecommerce **Angular app** with a **Node API**, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes.

Features
----

- The product grid loads more items as you scroll down.
- Sorting in ascending order by "size", "price" or "id".
- Each product has a "size" field, which is the font-size in pixels. Faces are displayed in their correct size to give a realistic feel of what you're buying.
- A timer in the backend simulates high network traffic, so an animated "loading..." message is displayed while the user waits.
- Idle-time is used to fetch the next batch of products, which are not displayed untill you scroll down.
- It has just enough CSS to get the basic layout.

Products API
----

- The response format is newline-delimited JSON.
- The basic query looks like this: `/api/products` 10 items returned by default.
- To get a larger/smaller results set use the `limit` parameter, eg: `/api/products?limit=100`
- The `skip` parameter paginates the results, eg: `/api/products?limit=15&skip=30` (returns 15 results starting from the 30th).
- Results are sorted with the `sort` parameer, eg: `/api/products?sort=price`. Valid sort values are `price`, `size` and `id`.

Ads
----

- After every 20 products we need to insert an advertisement from one of our sponsors.
- Ads are randomly selected, and the a user never see the same ad twice in a row.

Run it
----

You need <a href='http://nodejs.org/download/'>NPM</a> installed.

* Download the source code.

* Open a command window and navigate to the project's directory.

* Then enter ```npm install``` to install the project dependencies.

* Start with `node index.js`.


