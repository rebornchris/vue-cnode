<template>
    <div class="article-container">
        <article>
            <h1 class='article-title'>{{ article.title }}
        <div class='article-info'>dfsadfds</div>
            </h1>
           <div v-html="article.content"></div>
        </article>
    </div>
</template>

<script>
export default{

    props: {
        article: {
            require:true
        }
    }
}
</script>

