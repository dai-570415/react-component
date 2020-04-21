# 【環境構築】Create React Appの使い方

```bash
# グローバルインストール
$ npm install -g create-react-app

# Reactプロジェクト構築(react-basicは任意のプロジェクト名)
$ create-react-app react-basic
```

```
プロジェクト構成
.
├── .gitignore
├── README.md
├── package.json
├── node_modules
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.css
    ├── App.js(子コンポーネント)
    ├── App.test.js
    ├── index.css
    ├── index.js(親コンポーネント)
    └── logo.svg
```

cssもリセットしておく。

```css:index.css
/* 全体のcss */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

```css:App.css
/* Appコンポーネントのcss */
```


# Reactコンポーネント

```
└── src
    ├── App.js(こちらで内容を編集)
    ├── index.js(最終的に1つのHTMLに出力されるファイル)
    ├ ...
```

## Functionalコンポーネント と Classコンポーネント

コンポーネントには「Functionalコンポーネント」と「Classコンポーネント」の2種類がある。

### Functionalコンポーネント

```jsx:App.js
const App = () => {
  return (
    <div>
        <p>Hello Dai</p>
    </div>
  );
}
```
もともと、stateは使用できなかったが、
ステートフックというモジュールの導入でこちらでもstateが使用できるようになった。
こちらは別途まとめる予定。

### Classコンポーネント

特徴としてはstateが使用できる

```jsx:App.js
class App extends React.Component {
  render() {
    return (
      <div>
          <p>Hello Dai</p>
      </div>
    );
  }
}
```


### コンポーネント再利用
index.jsにタグとして再利用することが可能

```jsx:index.js
ReactDOM.render(
  <React.StrictMode>
    <App />
    <App />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

出力結果

```
Hello Dai

Hello Dai

Hello Dai
```

App.jsを1度変更するだけで一括で変わるので修正作業が簡略化される。

※`<App />` をエレメントという

エレメントは変数に格納して描画することも可能。

```jsx:index.js
// appElementという変数に格納
const appElement = <App />;

ReactDOM.render(
  <React.StrictMode>
    { appElement }
  </React.StrictMode>,
  document.getElementById('root')
);
```


# Fragmentコンポーネント

Reactコンポーネントは単一な親の要素でしか表現できない。

コンパイルエラーな例

```jsx:App.js
const App = () => {
  return (
      <p>Hello Dai</p>
      <p>Hello Dai</p>
  );
}
```

コンパイルOKな例

```jsx:App.js
const App = () => {
  return (
    <div>
      <p>Hello Dai</p>
      <p>Hello Dai</p>
    </div>
  );
}
```

しかし、本来必要じゃない<div>タグをついかしなければならず構造が変わってしまう問題がある。

出力結果

```html
<div>
  <p>Hello Dai</p>
  <p>Hello Dai</p>
</div>
```

そこでReact.Fragmentを利用する。

```jsx:App.js
const App = () => {
  return (
    <React.Fragment>
      <p>Hello Dai</p>
      <p>Hello Dai</p>
    </React.Fragment>
  );
}
```
<React.Fragment>...</React.Fragment>を簡略して
<>...</>と記述できる

出力結果

```html
<p>Hello Dai</p>
<p>Hello Dai</p>
```


# propsで親から子へデータを受け渡す

```jsx:index.js(親)
ReactDOM.render(
  <React.StrictMode>
    <App name="Dai" />
    <App name="Taro" />
  </React.StrictMode>,
  document.getElementById('root')
);
```
nameという任意の値で子へ受け渡すことが可能

```jsx:App.js(子)
const App = (props) => {
  return (
    <React.Fragment>
      <p>Hello { props.name }</p>
    </React.Fragment>
  );
}
```

複数の値の受け渡し

```jsx
<App name="Dai" age={38} />
// or
const profile = {
  name: 'Dai',
  age: 38,
  birthday: '1982.4.15',
}

<App { ...profile } />

// ===================================

const App = (props) => {
  return (
    <React.Fragment>
      <p>Hello { props.name }({ props.age })</p>
    </React.Fragment>
  );
}
// or
// オブジェクトスプレット演算子で直接展開可能
const App = ({ name, age }) => {
  return (
    <React.Fragment>
      <p>Hello { name }({ age })</p>
    </React.Fragment>
  );
}
```

## propsで受け渡せる値

#### 文字列
`<App name="Dai" />`
`<App name={"Dai"} />`

#### 数値
`<App age={38} />`

#### 真偽値
`<App render={true} />`

#### 配列
`<App items={['1', '2', '3']} />`

#### 変数
`const name = 'Dai';`
`<App value={name} />`

#### children
`<App>Dai</App>`

```jsx:App.js
// childrenで受け取れる
const App = ({ children }) => {
  return (
    <React.Fragment>
      <p>{ children }</p>
    </React.Fragment>
  );
}
```

## propsの型チェック

```jsx:App.js
// 追加
import PropTypes from 'prop-types';

const App = ({...}) => {...}

App.propTypes = {
  name:PropTypes.string,
}
```

#### 型チェック種類
文字列: string
数値: number
真偽値: bool
array: 配列
オブジェクト: object
関数: func
シンボル: symbol


# 簡易なTodoアプリ

## 機能
- Todoの追加
- Todoの削除

## プロジェクト構成

```
.
├── .gitignore
├── README.md
├── package.json
├── node_modules
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── index.js
    ├── App.js
    └── components
        ├── TodoInput.js
        ├── TodoList.js
        └── TodoItem.js
    └── assets
        └── css
            ├── index.css
            └── App.css
        └── img
            └── ...必要ならここに入れていく
```

●index.js
最終的にHTMLに返すコンポーネント

●App.js
アプリ全体を表すコンポーネント

●TodoInput.js
入力フォームのコンポーネント

●TodoList.js
一覧を表すコンポーネント

●TodoItem.js
一つひとつのアイテムを表すコンポーネント


## Reactコンポーネントの作成手順

1. UIコンポーネントに分割する
2.　propsやstateによってどのようにUIが変化するか定義する(JSX)
3.　ユーザー操作によってどのようにstateが変化するか定義する(メソッド)
4.　UIとメソッドを紐づける(onClickなどの設定)