export default function Product({p}){
    return(
            <tr>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.description}</td>
                <td>{p.category}</td>
                <td>
                    <img src={p.image} width="70px"/>
                </td>
                <td>{p.rating.rate}</td>
            </tr>
    )
}