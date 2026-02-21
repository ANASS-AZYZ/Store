import { useState, useEffect } from "react";
import Product from "./Product";

export default function ProductListe() {

    const [productListes, setProductListes] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategorie]=useState('all')

    const getProduct = () => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(response => setProductListes(response));
    };

    useEffect(() => {
        getProduct();
    }, []);

    const handlechange = (e) => {
        setSearch(e.target.value);
    };

    const filteredProducts = productListes.filter((p) =>{
        const filterSearch=
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
        const filtercategorie=
            category==='all' || p.category ===category;
        return filterSearch && filtercategorie;
           
});

    return (
        <div className="container-fluid mx-auto w-75 my-3">
            <h2>Liste des Produit :</h2>
            <div className="d-flex gap-2 flex-wrap mb-3">
            <button className={category === "all" ? "btn btn-dark" : "btn btn-outline-dark"}onClick={() => setCategorie("all")}>
                All
            </button>

            <button className={category === "men's clothing" ? "btn btn-dark" : "btn btn-outline-dark"} onClick={() => setCategorie("men's clothing")}>
                Men's clothing
            </button>

            <button className={category === "women's clothing" ? "btn btn-dark" : "btn btn-outline-dark"}onClick={() => setCategorie("women's clothing")}>
                Women's clothing
            </button>

            <button className={category === "electronics" ? "btn btn-dark" : "btn btn-outline-dark"} onClick={() => setCategorie("electronics")}>
                Electronics
            </button>

            <button className={category === "jewelery" ? "btn btn-dark" : "btn btn-outline-dark"} onClick={() => setCategorie("jewelery")}>
                Jewelery
            </button>
            </div>

            <input
                type="text"
                className="form-control my-3"
                placeholder="Search product..."
                value={search}
                onChange={handlechange}
            />

            <table className="table table-bordered">
                <thead className="bg-dark text-white">
                    <tr>
                        <th>#ID</th>
                        <th className="text-center">TITLE</th>
                        <th className="text-center">PRICE</th>
                        <th className="text-center">DESCRIPTION</th>
                        <th className="text-center">CATEGORY</th>
                        <th className="text-center">IMAGE</th>
                        <th className="text-center">RATING</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((p) => (
                            <Product key={p.id} p={p} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center text-danger">
                                No products found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}