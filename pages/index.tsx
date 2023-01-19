import Link from "next/link";
import { Product } from "../types/product";
import { ProductListRSBody } from "../types/productListRSBody";
import { getConfig } from "../Utility/configUtility";

/**
 * 
 * @param rsBody 
 * @returns 
 */
export default function Home(rsBody : ProductListRSBody) {
  console.log("==============================");
  console.log('Home Start')

  console.log('Home End')
  console.log("==============================");

  return (
    <div>
      <h1>製品一覧(SSG)</h1>
      <ul>
        {/*
        // TODO Warning: Each child in a list should have a unique "key" prop.が発生する
        //      本来は<li>の内容をコンポーネント化してmapを使うのがよい
        //      順入れ替えの処理がないかつ、そこまで作りこむ必要がないのでここでは放置でも良い
        */}
        {
          rsBody.products.map(
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
      <p><Link href="/csr">CSRページへ</Link></p>
    </div>
  )
}

/**
 * SSG処理 
 * @returns 
 */
export const getStaticProps = async () => {

  console.log("==============================");
  console.log("index.tsx getStaticProps Start");

  // next.config.jsからWebApiのURLを取得
  const url : string = getConfig(process.env.RESTURL_PRODUCTLIST);

  const res : Response = await fetch(url);

  const products : Product[] = await res.json();

  console.log("index.tsx getStaticProps End");
  console.log("==============================");

  return {
    props: {
      products: products,
    }
  }

}