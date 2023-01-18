import Link from "next/link";
import { Product } from "../../types/product";
import { ProductDetailRSBody } from "../../types/productDetailRSBody";
import { getConfig } from "../../Utility/configUtility";


const ProductDetailPage = (rsBody: ProductDetailRSBody) => {

    if(typeof rsBody === 'undefined') {
        console.log('rsBody undeifined')
        return;
    }

    if(typeof rsBody.product === 'undefined') {
        console.log('rsBody.product undeifined')
        return;
    }

    if(typeof rsBody.product.title === 'undefined') {
        console.log('rsBody.product.title undeifined')
        return;
    }

    console.log(rsBody);
    console.log(rsBody.product);
    console.log(rsBody.product.title);

    return (
        <div>
            <h1>{rsBody.product.title}</h1>
            <p>{rsBody.product.body}</p>
            <br/>
            <p><Link href="/">戻る</Link></p>
        </div>
    )
    
}

/*
const ProductDetailPage = ({product}: {product : Product}) => {

    return (
        <div>
            <h1>{product.title}</h1>
            <p>{product.body}</p>
            <br/>
            <p><Link href="/">戻る</Link></p>
        </div>
    )
}*/

export default ProductDetailPage;

// 各ページのレンダリング
export const getStaticProps = async (context : any) => {
    // params: {pageUrl: XX}
    // locales:
    // locale:
    // defaultLocale:

    console.log("==============================");
    console.log("[pageUrl].tsx getStaticProps Start");
    /*console.log("------------------------------");
    console.log("context");
    console.log(context);*/
    const pageUrl = context.params.pageUrl;

    // next.config.jsからWebApiのURLを取得
    const url : string = getConfig(process.env.RESTURL_SEARCHPAGEURL);

    const res : Response = await fetch(url + pageUrl);

    /*console.log("------------------------------");
    console.log("res");
    console.log(res);*/

    const product: Product = await res.json();

    /*console.log("------------------------------");
    console.log("product");
    console.log(product);*/
    console.log("------------------------------");
    console.log("[pageUrl].tsx getStaticProps End");
    console.log("==============================");

    return {
        props: {
            product: product
            //product: { productId: 1, pageUrl: 'SeizaiA', title: '製剤A', body: '製剤Aの内容。' }
        }
    }
}

// どんな動的pathがあるか
export const getStaticPaths = async () => {

    console.log("==============================");
    console.log("[pageUrl].tsx getStaticPaths Start");

    // next.config.jsからWebApiのURLを取得
    const url : string = getConfig(process.env.RESTURL_PRODUCTLIST);

    const res : Response = await fetch(url);
    //console.log('RESTURL_PRODUCTLIST:' + url);

    const products : any = await res.json();
    //console.log("------------------------------");
    /*console.log("products");
    console.log(products);*/

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
    //return { paths, fallback: false };
/*
    return {
        paths: [
            { params: { pageUrl: 'SeizaiA' } },
            { params: { pageUrl: 'SeizaiB' } },
            { params: { pageUrl: 'SeizaiC' } }, 
        ],
    //-   fallback: false
       fallback: true // ここを true に設定した
      }*/
}

