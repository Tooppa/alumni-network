import snarkdown from "snarkdown";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import { filterXSS } from "xss";

const parseHTML = async (val: string) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(val);

  return snarkdown(filterXSS(String(file)));
};

export default parseHTML;