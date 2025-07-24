import { Mail, GraduationCap } from "lucide-react"

export default function MembersSection() {
  const professor = {
    name: "정동원",
    title: "Professor",
    image: "/placeholder.svg?height=300&width=240",
    research: "정보과학기술, Database",
    email: "professor@kunsan.ac.kr",
  }

  const members = [
    {
      category: "Master's Students",
      people: [
        {
          name: "Master's Student",
          image: "/placeholder.svg?height=200&width=200",
          research: "Data Science",
          email: "masters@kunsan.ac.kr",
        },
      ],
    },
    {
      category: "Undergraduate Researchers",
      people: [
        {
          name: "Undergraduate Researcher",
          image: "/placeholder.svg?height=200&width=200",
          research: "Software Development",
          email: "undergrad@kunsan.ac.kr",
        },
      ],
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-blue-800 mb-4">Members</h2>
          <div className="w-24 h-1 bg-dark-blue-800 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">IST Lab의 우수한 연구원들을 소개합니다.</p>
        </div>

        {/* Professor Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-dark-blue-800 mb-8 text-center">Professor</h3>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm">
              <div className="text-center">
                <div className="w-48 h-60 mx-auto mb-6 overflow-hidden rounded-lg">
                  <img
                    src={professor.image || "/placeholder.svg"}
                    alt={professor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">{professor.name}</h4>
                <p className="text-dark-blue-700 font-medium mb-4">{professor.title}</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    <span>
                      <strong>연구 분야:</strong> {professor.research}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{professor.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Researchers Section */}
        <div>
          <h3 className="text-2xl font-bold text-dark-blue-800 mb-8 text-center">Researchers</h3>
          {members.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h4 className="text-xl font-semibold text-dark-blue-700 mb-6">{category.category}</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.people.map((person, personIndex) => (
                  <div
                    key={personIndex}
                    className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                  >
                    <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                      <img
                        src={person.image || "/placeholder.svg"}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h5 className="text-lg font-bold text-dark-blue-800 mb-2">{person.name}</h5>
                    <p className="text-gray-600 mb-3">{category.category}</p>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        <span>
                          <strong>연구 분야:</strong> {person.research}
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{person.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Join Us Section */}
        <div className="mt-16 bg-dark-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-dark-blue-800 mb-4">Join Our Team</h3>
          <p className="text-gray-700 mb-6">IST Lab에서 함께 연구하고 성장할 새로운 연구원을 모집합니다.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-dark-blue-800 text-white px-6 py-3 rounded-lg hover:bg-dark-blue-900 transition-colors">
              대학원생 모집 정보
            </button>
            <button className="border border-dark-blue-800 text-dark-blue-800 px-6 py-3 rounded-lg hover:bg-dark-blue-800 hover:text-white transition-colors">
              학부연구생 지원
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
