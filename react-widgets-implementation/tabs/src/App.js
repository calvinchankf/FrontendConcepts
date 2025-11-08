import { useState } from 'react'
import Tabs from './Tabs';

export default function App() {
  
  const [tabIdx, setTabIdx] = useState(0)

  const titles = ['HTML', 'CSS', 'JavaScript']
  const contents = [
    "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
    "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
    "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS."
  ]

  return <>
    <Tabs
      titles={titles}
      tabIdx={tabIdx}
      onTabChange={(i) => {
        console.log(i)
        setTabIdx(i)
      }}
    />
    <div><p>{contents[tabIdx]}</p></div>
  </>;
}