import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { knowledgeAssetPath } from "@/lib/ai-knowledge/url";

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src = "", alt = "" }) => <img src={knowledgeAssetPath(src)} alt={alt} />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
