export default function Page({ postId, post }) {
    return (
      <>
      <h1>ブログ</h1>
      <h2>ID: {postId} の記事</h2>
      <h3>{post}</h3>
      </>
    )
  }
  
  // 実際は、ブログの本文データは外部 API から取得してくるようなつくりになるはずだが、
  // ここでは挙動の解説のために、記事 ID をもとにブログ本文を取得する、API を模したような関数を定義している
  function fetchContent(articleId) {
    switch (articleId) {
      case 'my-first-post':
        return '初投稿です！これからよろしくお願いします。'
  
      case 'my-second-post':
        return 'SSG を勉強中！'
  
      case 'my-third-post':
        return 'Next.js は楽しい！'
  
  
    case 'my-fourth-post':
     return '勉強することが多くて大変だ〜'

    case 'my-fifth-post':
      return 'これからも頑張ります！'

    default:
      return 'no content'
    }
  }
  
  export async function getStaticProps(context) {
    const postId = context.params.id // context.params で、paths で指定した params を参照できる
    const post = fetchContent(postId) // 実際はここで外部 API からデータを取得するようなつくりになる
  
    return {
      props: { postId, post },
    }
  }
  
  export async function getStaticPaths() {
    return {
      paths: [
          { params: { id: 'my-first-post' } },
          { params: { id: 'my-second-post' } },
          { params: { id: 'my-third-post' } }, 
      ],
  //-   fallback: false
     fallback: true // ここを true に設定した
    }
  }