import React, { useEffect } from 'react'
import { InfiniteScroll } from './InfiniteScroll'
import { getIcon } from './SkillsIconLoader'

// Types for technologies
type Category = {
  text: string
  logo: string
}

type Technologies = {
  'Programming Languages': Category[]
  'Frontend': Category[]
  'Backend': Category[]
  'Database': Category[]
  'Cloud/DevOps': Category[]
  'Artificial Intelligence': Category[]
}

// Technologies based on your stack
const technologies: Technologies = {
  'Programming Languages': [
    { text: 'Python', logo: 'simple-icons:python' },
    { text: 'JavaScript', logo: 'simple-icons:javascript' },
    { text: 'TypeScript', logo: 'simple-icons:typescript' },
  ],
  'Frontend': [
    { text: 'React.js', logo: 'simple-icons:react' },
    { text: 'Redux', logo: 'simple-icons:redux' },
    { text: 'Next.js', logo: 'simple-icons:nextdotjs' },
    { text: 'Webpack', logo: 'simple-icons:webpack' },
    { text: 'Babel', logo: 'simple-icons:babel' },
  ],
  'Backend': [
    { text: 'Node.js', logo: 'simple-icons:nodedotjs' },
    { text: 'Express.js', logo: 'simple-icons:express' },
    { text: 'Django', logo: 'simple-icons:django' },
    { text: 'FastAPI', logo: 'simple-icons:fastapi' },
  ],
  'Database': [
    { text: 'PostgreSQL', logo: 'simple-icons:postgresql' },
    { text: 'MySQL', logo: 'simple-icons:mysql' },
    { text: 'MongoDB', logo: 'simple-icons:mongodb' },
    { text: 'Redis', logo: 'simple-icons:redis' },
  ],
  'Cloud/DevOps': [
    { text: 'Microsoft Azure', logo: 'simple-icons:microsoftazure' },
    { text: 'AWS', logo: 'simple-icons:amazonaws' },
    { text: 'Kubernetes', logo: 'simple-icons:kubernetes' },
    { text: 'Docker', logo: 'simple-icons:docker' },
    { text: 'Jenkins', logo: 'simple-icons:jenkins' },
    { text: 'GitHub CI/CD', logo: 'simple-icons:githubactions' },
  ],
  'Artificial Intelligence': [
    { text: 'RAG', logo: 'lucide:brain' },
    { text: 'AI Agents', logo: 'lucide:bot' },
    { text: 'LLM', logo: 'lucide:messages-square' },
    { text: 'Neural Networks', logo: 'lucide:network' },
  ],
}

const categories = Object.keys(technologies)
const groupSize = Math.ceil(categories.length / 3)
const categoryGroups = [
  categories.slice(0, groupSize),
  categories.slice(groupSize, groupSize * 2),
  categories.slice(groupSize * 2),
]

const Skills: React.FC = () => {
  useEffect(() => {
    document.querySelectorAll('.tech-badge').forEach((badge) => {
      badge.classList.add('tech-badge-visible')
    })
  }, [])

  return (
    <div className="z-30 mt-12 flex w-full flex-col max-w-[calc(100vw-5rem)] mx-auto lg:max-w-full">
      <div className="space-y-2">
        {categoryGroups.map((group, groupIndex) => (
          <InfiniteScroll
            key={groupIndex}
            duration={50000}
            direction={groupIndex % 2 === 0 ? 'normal' : 'reverse'}
            showFade={true}
            className="flex flex-row justify-center"
          >
            {group.flatMap((category) =>
              technologies[category as keyof Technologies].map(
                (tech: Category, techIndex: number) => {
                  const IconComponent = getIcon(tech.logo)
                  return (
                    <div
                      key={`${category}-${techIndex}`}
                      className="tech-badge repo-card border-border bg-card text-muted-foreground mr-5 flex items-center gap-3 rounded-full border p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                      data-tech-name={`${category}-${techIndex}`}
                    >
                      <span className="bg-muted flex h-10 w-10 items-center justify-center rounded-full p-2 text-lg shadow-inner">
                        <IconComponent className="tech-icon text-primary" />
                      </span>
                      <span className="text-foreground font-medium">
                        {tech.text}
                      </span>
                    </div>
                  )
                },
              ),
            )}
          </InfiniteScroll>
        ))}
      </div>
    </div>
  )
}

export default Skills