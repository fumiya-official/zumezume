# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
SAMPLE_WORKS = [
  {
      user_id: 0,
      title: "かぼちゃ",
      content: "かぼちゃはとても美味しい。甘くて美味しい。だが、糖度が米のでんぷんと似通ってて、米には合わない。",
      release: 1
  },
  {
      user_id: 0,
      title: "芥川",
      content: "あれは過去のあれじゃない。すっかり変わってしまった。"
  },
  {
      user_id: 1,
      title: "太宰",
      content: "動物が二匹いた。そうして女は男に汚されてしまった。",
      release: 1
  }
]

SAMPLE_WORKS.each do |work|
    Work.create(work)
end