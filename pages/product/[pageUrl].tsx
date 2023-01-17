import Link from "next/link";
import { Product } from "../../types/product";
import { ProductDetailRSBody } from "../../types/productDetailRSBody";
import { getConfig } from "../../Utility/configUtility";

const ProductDetailPage = (rsBody: ProductDetailRSBody) => {
    return (
        <div>
            <h1>{rsBody.product.title}</h1>
            <p>{rsBody.product.body}</p>
            <br/>
            <p><Link href="/">戻る</Link></p>
        </div>
    )
}

export default ProductDetailPage;

// どんな動的pathがあるか
export const getStaticPaths = async () => {

    console.log("==============================");
    console.log("[pageUrl].tsx getStaticPaths Start");

    // next.config.jsからWebApiのURLを取得
    const url : string = getConfig(process.env.RESTURL_PRODUCTLIST);

    const res : Response = await fetch(url);
    console.log('RESTURL_PRODUCTLIST:' + url);

    const products : any = await res.json();
    console.log("------------------------------");
    console.log("products");
    console.log(products);

    const paths = products.map((json: { pageUrl: string; }) => `/product/${json.pageUrl}`);

    console.log("index.tsx getStaticProps End");
    console.log("[pageUrl].tsx getStaticPaths End");
/*
    const res : Response = await fetch("http://localhost:3002/product");
    console.log("------------------------------");
    console.log("res");
    console.log(res);

    const json : any = await res.json();
    console.log("------------------------------");
    console.log("json");
    console.log(json);

    const paths = json.map((json: { pageUrl: string; }) => `/product/${json.pageUrl}`);

    console.log("paths");
    console.log(paths)

    console.log("[pageUrl].tsx getStaticPaths End");
    console.log("==============================");
*/
    // 動的ルート用HTML静的生成
    return { paths, fallback: false };
}

// 各ページのレンダリング
export const getStaticProps = async (context : any) => {
    // params: {pageUrl: XX}
    // locales:
    // locale:
    // defaultLocale:

    console.log("==============================");
    console.log("[pageUrl].tsx getStaticProps Start");
    console.log("------------------------------");
    console.log("context");
    console.log(context);
    const pageUrl = context.params.pageUrl;

    // next.config.jsからWebApiのURLを取得
    const url : string = getConfig(process.env.RESTURL_SEARCHPAGEURL);

    const res : Response = await fetch(url + pageUrl);
    //const res : Response = await fetch(`http://localhost:3002/product/pageUrlSearch/${pageUrl}`);
    console.log("------------------------------");
    console.log("res");
    console.log(res);

    const json = await res.json();
    console.log("------------------------------");
    console.log("json");
    console.log(json);
    console.log("------------------------------");
    console.log("[pageUrl].tsx getStaticProps End");
    console.log("==============================");

    return {
        props: {
            product: json
        }
    }
}

