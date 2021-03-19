import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const Markdown = props => {
  const mdToHtml = md.render(props.children);
  return (
    <div dangerouslySetInnerHTML={{ __html: mdToHtml }}>
    </div>
  )
}

export default Markdown;