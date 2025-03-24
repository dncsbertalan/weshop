import { useParams } from "react-router";

export function ProductPage() {
    const { id } = useParams<{ id: string }>();
    return (
        <div>
            <h1>Product Page</h1>
            <p>Product ID: {id}</p>
        </div>
    );
}