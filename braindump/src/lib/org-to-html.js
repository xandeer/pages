import { unified } from 'unified'

import orgParse from 'uniorg-parse'
import org2rehype from 'uniorg-rehype'
import extractKeywords from 'uniorg-extract-keywords'
import { uniorgSlug } from 'uniorg-slug'
import { uniorgAttach } from 'uniorg-attach'
import { visitIds } from 'orgast-util-visit-ids'
import rehypeHighlight from 'rehype-highlight'

const processor = unified()
  .use(orgParse)
  .use(extractKeywords)
  .use(uniorgSlug)
  .use(extractIds)
  .use(uniorgAttach, {
    useInheritance: true,
    idDir: '.attach/'
  })
  .use(org2rehype, {
    imageFilenameExtensions: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'JPG', 'JPEG', 'PNG', 'GIF', 'SVG']
  })
  .use(rehypeHighlight, {
    ignoreMissing: true,
    aliases: { sh: 'bash' }
  })
  .use(toJson)

export default async function orgToHtml(file) {
  try {
    return await processor.process(file)
  } catch (error) {
    console.error('failed to process file', file.path, error)
    throw error
  }
}

function extractIds() {
  return transformer

  function transformer(tree, file) {
    const data = file.data || (file.data = {})
    // Ids is a map: id => #anchor
    const ids = data.ids || (data.ids = {})

    visitIds(tree, (id, node) => {
      if (node.type === 'org-data') {
        ids[id] = ''
      } else if (node.type === 'section') {
        const headline = node.children[0]
        if (!headline.data?.hProperties?.id) {
          // The headline doesn't have an html id assigned. (Did you
          // remove uniorg-slug?)
          //
          // Assign an html id property based on org id property.
          headline.data = headline.data || {}
          headline.data.hProperties = headline.data.hProperties || {}
          headline.data.hProperties.id = id
        }

        ids[id] = '#' + headline.data.hProperties.id
      }
    })
  }
}

/** A primitive compiler to return node as is without stringifying. */
function toJson() {
  this.Compiler = node => {
    return node
  }
}
