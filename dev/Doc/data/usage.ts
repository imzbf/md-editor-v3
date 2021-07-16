export default `<h2 id="1-基本使用">1. 基本使用</h2>
<p>目前一直在迭代开发，所以尽量安装小版本中最新版本。</p>
<pre><code class="language-shell">yarn <span class="hljs-keyword">add</span> md-editor-v3
</code><span class="copy-button">复制代码</span></pre>
<p>目前 vue3 已经能很友好的使用 jsx 来开发了，对于一些爱好者（比如作者本身），需要考虑兼容一下。</p>
<p>两种方式开发上区别在于<strong>vue 模板</strong>能很好的支持<code>vue</code>特性，比如指令，内置的双向绑定等；而<strong>jsx 语法</strong>更偏向于<code>react</code>的理念，开发环境来讲 jsx 如果在支持 ts 的环境下，会更友好一些。</p>
<h3 id="11-在vue模板中使用">1.1 在vue模板中使用</h3>
<pre><code class="language-js"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">md-editor</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"text"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"ts"</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { defineComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">MdEditor</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'md-editor-v3'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'md-editor-v3/lib/style.css'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineComponent</span>({
  <span class="hljs-attr">components</span>: {
    <span class="hljs-title class_">MdEditor</span>
  },
  <span class="hljs-title function_">data</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">text</span>: <span class="hljs-string">''</span>
    };
  }
});
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code><span class="copy-button">复制代码</span></pre>
<h3 id="12-在jsx中使用">1.2 在jsx中使用</h3>
<pre><code class="language-js"><span class="hljs-keyword">import</span> { defineComponent, ref } <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">MdEditor</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'md-editor-v3'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'md-editor-v3/lib/style.css'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineComponent</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">'MdEditor'</span>,
  <span class="hljs-title function_">setup</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> text = <span class="hljs-title function_">ref</span>(<span class="hljs-string">''</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">MdEditor</span> <span class="hljs-attr">modelValue</span>=<span class="hljs-string">{text.value}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(v:</span> <span class="hljs-attr">string</span>) =&gt;</span> (text.value = v)} /&gt;</span>
    );
  }
});
</code><span class="copy-button">复制代码</span></pre>`;
