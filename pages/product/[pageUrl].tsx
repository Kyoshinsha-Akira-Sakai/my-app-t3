import Link from "next/link";
import { Product } from "../../types/product";
import { ProductDetailRSBody } from "../../types/productDetailRSBody";
import { getConfig } from "../../Utility/configUtility";
import { useRouter } from 'next/router'

const ProductDetailPage = (rsBody: ProductDetailRSBody) => {

    console.log("==============================");
    console.log('ProductDetailPage Start')

    const router = useRouter();
    if(router.isFallback) {
        console.log('ProductDetailPage FallBack')
        return <div>Loading...</div>
    }

    console.log('ProductDetailPage End')
    console.log("==============================");

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

    const pageUrl = context.params.pageUrl;

    // next.config.jsからWebApiのURLを取得
    const url : string = getConfig(process.env.RESTURL_SEARCHPAGEURL);

    const res : Response = await fetch(url + pageUrl);

    const product: Product = await res.json();

    console.log("[pageUrl].tsx getStaticProps End");
    console.log("==============================");

    return {
        props: {
            product: product
        }
    }
}

// どんな動的pathがあるか
export const getStaticPaths = async () => {

    console.log("==============================");
    console.log("[pageUrl].tsx getStaticPaths Start");

    // next.config.jsからWebApiのURLを取得
    const url : string = getConfig(process.env.RESTURL_PRODUCTLISTPREBUILD);

    const res : Response = await fetch(url);

    const products : any = await res.json();

    const paths = products.map((product: { pageUrl: string; }) => ({params: {pageUrl:product.pageUrl}}));

    console.log("[pageUrl].tsx getStaticPaths End");
    console.log("==============================");

    // 動的ルートかつ段階的なHTMLの生成、生成前後の2段階でHTML表示
    // 対象のページがリクエストされたタイミングでHTMLが生成される
    // 次回以降のリクエストでは静的生成されたHTMLを返す。
    // 一回目は即座にビルドされたHTMLが返されるのではなく空っぽのHTMLを返した後にJSで書き換える
    // ユーザー視点ではloadingの状態を少しはさんで表示される動きになる
    // 二回目のリクエスト以降はこの動きは発生しない。
    return { paths, fallback: true };
}

