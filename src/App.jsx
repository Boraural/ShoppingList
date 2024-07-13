import React, { useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import IconButton from './components/IconButton';
import './App.css';
import Fuse from 'fuse.js';

const shops = [
  { id: 1, name: "Migros" },
  { id: 2, name: "Teknosa" },
  { id: 3, name: "Bim" },
];

const categories = [
  { id: 1, name: "Elektronik" },
  { id: 2, name: "Şarküteri" },
  { id: 3, name: "Oyuncak" },
  { id: 4, name: "Bakliyat" },
  { id: 5, name: "Fırın" },
];

const TableRow = styled.tr`
  text-decoration: ${(props) => (props.$isBought ? "line-through" : "unset")};
`;

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productShop, setProductShop] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const [filteredName, setFilteredName] = useState("");
  const [filteredShopId, setFilteredShopId] = useState("");
  const [filteredCategoryId, setFilteredCategoryId] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("");

  const handleAddProduct = () => {
    const product = {
      id: nanoid(),
      name: productName,
      category: productCategory,
      shop: productShop,
    };

    setProducts([...products, product]);
    setProductName("");
    setProductShop("");
    setProductCategory("");
  };

  const handleProductClick = (productId) => {
    const updatedProducts = products.map((oldProduct) =>
      oldProduct.id === productId ? { ...oldProduct, isBought: true } : oldProduct
    );

    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) => {
    let result = true;

    const fuse = new Fuse(products, {
      keys: ["name"],
    });
    const searchResult = fuse.search(filteredName);

    if (filteredName !== '' && !searchResult.find(r => r.item.id === product.id)) {
      result = false;
    }

    if (filteredStatus !== '' && !!product.isBought !== (filteredStatus === "true")) {
      result = false;
    }

    if (filteredShopId !== "" && product.shop !== filteredShopId) {
      result = false;
    }

    return result;
  });

  return (
    <>
      <div className='ojs'>
        <Form>
          <Form.Group className="mb-3 fgroup" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <Form.Select
              aria-label="Default select example"
              className="mt-3 fgroup"
              value={productShop}
              onChange={(e) => setProductShop(e.target.value)}
            >
              <option>Shop</option>
              {shops.map((shop) => (
                <option key={shop.id} value={shop.id}>{shop.name}</option>
              ))}
            </Form.Select>
            <Form.Select
              aria-label="Default select example"
              className="mt-3 fgroup"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option>Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
        <button className="btn btn-success" onClick={handleAddProduct}>
          EKLE
        </button>
      </div>
      <Form>
        <Form.Group className="mb-3 fgroup" controlId="exampleForm.ControlInput1">
          <Form.Label>Filter Name</Form.Label>
          <Form.Control
            type="text"
            value={filteredName}
            onChange={(e) => setFilteredName(e.target.value)}
          />
          <Form.Check
            inline
            value={'reset'}
            label="sıfırla"
            name="group1"
            type={'radio'}
            id={`inline-radio-1`}
            onChange={() => setFilteredStatus("")}
          />
          <Form.Check
            inline
            value={"true"}
            label="alınmış"
            name="group1"
            type={'radio'}
            id={`inline-radio-2`}
            onChange={() => setFilteredStatus("true")}
          />
          <Form.Check
            inline
            value={"false"}
            label="alınmamış"
            name="group1"
            type={'radio'}
            id={`inline-radio-3`}
            onChange={() => setFilteredStatus("false")}
          />
          <Form.Select
            aria-label="Default select example"
            className="mt-3 fgroup"
            value={filteredShopId}
            onChange={(e) => setFilteredShopId(e.target.value)}
          >
            <option>Filter Shop</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>{shop.name}</option>
            ))}
          </Form.Select>
          <Form.Select
            aria-label="Default select example"
            className="mt-3 fgroup"
            value={filteredCategoryId}
            onChange={(e) => setFilteredCategoryId(e.target.value)}
          >
            <option>Filter Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
      <button className="btn btn-danger" onClick={() => { }}>
        FİLTRE
      </button>
      <Table striped bordered hover className="table-custom mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Shop</th>
            <th>Category</th>
            <th>ID</th>
            <th>SİL</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id} $isBought={product.isBought}>
              <td>{product.name}</td>
              <td>{shops.find((shop) => shop.id === parseInt(product.shop))?.name}</td>
              <td>{categories.find((category) => category.id === parseInt(product.category))?.name}</td>
              <td>{product.id}</td>
              <td>
                <IconButton
                  handleClick={() => {
                    setProducts(products.filter((filterProduct) => filterProduct.id !== product.id));
                  }}
                />
              </td>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default App;





