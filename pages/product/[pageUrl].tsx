import Link from "next/link";
import { useRouter } from "next/router";
import { Product } from "../../types/product";
import { ProductDetailRSBody } from "../../types/productDetailRSBody";
import { getConfig } from "../../Utility/configUtility";

const ProductDetailPage = (rsBody: ProductDetailRSBody) => {

    const router = useRouter();

    if (router.isFallback) {
      <h1>Data is loading</h1>;
    }

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

    //const paths = products.map((json: { pageUrl: string; }) => `/product/${json.pageUrl}`);

    const paths = products.map((product: { pageUrl: string; }) => ({params: {pageUrl:product.pageUrl}}));

    console.log("[pageUrl].tsx getStaticPaths End");

    // 動的ルートかつ段階的なHTMLの生成、生成前後の2段階でHTML表示
    // 対象のページがリクエストされたタイミングでHTMLが生成される
    // 次回以降のリクエストでは静的生成されたHTMLを返す。
    // 一回目は即座にビルドされたHTMLが返されるのではなく空っぽのHTMLを返した後にJSで書き換える
    // ユーザー視点ではloadingの状態を少しはさんで表示される動きになる
    // 二回目のリクエスト以降はこの動きは発生しない。
    return { paths, fallback: true };
    //return { paths: [{ params: { pageUrl: 'SeizaiA' }}, { params: { pageUrl: 'SeizaiB' }}], fallback: true };
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

