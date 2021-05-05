import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

const Markdown = (props) => {
  const { children } = props
  const mdToHtml = md.render(children)
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: mdToHtml }} />
}

export default Markdown
