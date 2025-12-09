/**
 * Optimized icon loader for Skills component
 * This helps with tree-shaking by importing icons only when needed
 */
import { type IconType } from 'react-icons'
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiRedux,
  SiNextdotjs,
  SiWebpack,
  SiBabel,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiFastapi,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiKubernetes,
  SiDocker,
  SiJenkins,
  SiGithubactions,
} from 'react-icons/si'
import { LuBrain, LuBot, LuMessagesSquare, LuNetwork } from 'react-icons/lu'
import { FaAws,FaQuestionCircle } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";



// Icon mapping - using direct imports for better tree-shaking
export const iconMap: { [key: string]: IconType } = {
  // Programming Languages
  'simple-icons:python': SiPython,
  'simple-icons:javascript': SiJavascript,
  'simple-icons:typescript': SiTypescript,

  // Frontend
  'simple-icons:react': SiReact,
  'simple-icons:redux': SiRedux,
  'simple-icons:nextdotjs': SiNextdotjs,
  'simple-icons:webpack': SiWebpack,
  'simple-icons:babel': SiBabel,

  // Backend
  'simple-icons:nodedotjs': SiNodedotjs,
  'simple-icons:express': SiExpress,
  'simple-icons:django': SiDjango,
  'simple-icons:fastapi': SiFastapi,

  // Database
  'simple-icons:postgresql': SiPostgresql,
  'simple-icons:mysql': SiMysql,
  'simple-icons:mongodb': SiMongodb,
  'simple-icons:redis': SiRedis,

  // Cloud/DevOps
  'simple-icons:microsoftazure': VscAzure,
  'simple-icons:amazonaws': FaAws,
  'simple-icons:kubernetes': SiKubernetes,
  'simple-icons:docker': SiDocker,
  'simple-icons:jenkins': SiJenkins,
  'simple-icons:githubactions': SiGithubactions,

  // AI
  'lucide:brain': LuBrain,
  'lucide:bot': LuBot,
  'lucide:messages-square': LuMessagesSquare,
  'lucide:network': LuNetwork,
}

export function getIcon(logo: string): IconType {
  return iconMap[logo] || FaQuestionCircle
}
