export function getSubjectColor(subject: string): string {
  switch (subject.toLowerCase()) {
    case 'chemistry':
      return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
    case 'biology':
      return 'bg-green-500/10 text-green-600 border-green-500/20'
    case 'physics':
      return 'bg-purple-500/10 text-purple-600 border-purple-500/20'
    default:
      return 'bg-gray-500/10 text-gray-600 border-gray-500/20'
  }
}

