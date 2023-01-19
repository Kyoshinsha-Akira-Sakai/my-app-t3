import Link from "next/link";
import { useEffect, useState } from "react"
import { Product } from "../types/product";
import { getConfig } from "../Utility/configUtility";

const CsrPage = () => {
    
    // contentの入れ物
    const [products,setProducts] = useState<Product[]>([]);

    // ページ読み込み時に取得（CSR）
    useEffect(()=>{
        const getContents = async () => {
            console.log("==============================");
            console.log("csr.tsx getContents Start");
            // next.config.jsからWebApiのURLを取得
            const url : string = getConfig(process.env.RESTURL_PRODUCTLIST);

            const res : Response = await fetch(url);

            const products : Product[] = await res.json();
            setProducts(products);
            console.log("csr.tsx getContents End");
            console.log("==============================");
        }
        getContents();
    },[]);

    return (
        <div>
            <h1>記事一覧(CSR)</h1>
            <ul>
                {
                  products.map(
                    (product) => (
                      <li key={product.proructId}>
                        <Link href={`/product/${product.pageUrl}`}>
                          {product.title}
                        </Link>
                      </li>
                    )
                  )
                }
            </ul>
            <Link href="/">戻る</Link>
        </div>
    );
}

export default CsrPage;