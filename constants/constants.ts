import { Actor } from "@/app/types/actor.type"

export const KEY_LOCAL = "key_vivoice"
export const HARDCODED_VOICES: Actor[] = [
    {
      id: 1,
      name: "HN - Ngọc Huyền",
      code: "hn_female_ngochuyen_full_48k-fhg",
      gender: "female",
      type: "PREMIUM",
      description: "Giọng nữ nổi bật nhất của Vbee, chất giọng truyền cảm, rõ ràng, phù hợp với các nội dung review phim, giải trí, quảng cáo.",
      avatar: "https://vbee-studio-data.s3.ap-southeast-1.amazonaws.com/images/voices/round/ngoc-huyen.png",
      is_premium: true,
      sample_audio: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_female_ngochuyen_fast_news_48k-thg.mp3",
      language: {
        id: 1,
        name: "Tiếng Việt",
        code: "vi-VN"
      },
      category: {
        id: 1,
        name: "Review",
        code: "review"
      }
    },
    {
      id: 2,
      name: "HN - Minh Quân",
      code: "hn_male_minhquan_yt-stable",
      gender: "male",
      type: "STANDARD",
      description: "Giọng nam trẻ trung, nhấn nhá, phù hợp với các nội dung tin tức giải trí, quảng cáo, khoa học công nghệ.",
      avatar: "https://vbee-studio-data.s3.ap-southeast-1.amazonaws.com/images/voices/round/minh-quan.png",
      is_premium: false,
      sample_audio: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_male_minhquan_yt-stable.mp3",
      language: {
        id: 1,
        name: "Tiếng Việt",
        code: "vi-VN"
      },
      category: {
        id: 2,
        name: "Quảng cáo",
        code: "advertise"
      }
    },
    {
      id: 3,
      name: "HN - Ngân Hà",
      code: "hn_female_nganha_child_22k-vc",
      gender: "female",
      type: "STANDARD",
      description: "Giọng bé gái trong trẻo, dễ thương, phù hợp với các nội dung giáo dục, sách nói, truyện cổ tích, video học tập.",
      avatar: "https://vbee-studio-data.s3.ap-southeast-1.amazonaws.com/images/voices/round/ngan-ha.png",
      is_premium: false,
      sample_audio: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_female_nganha_child_22k-vc.mp3",
      language: {
        id: 1,
        name: "Tiếng Việt",
        code: "vi-VN"
      },
      category: {
        id: 3,
        name: "Thiếu nhi",
        code: "children"
      }
    },
    {
      id: 4,
      name: "HN - Việt Bách",
      code: "hn_male_vietbach_child_22k-vc",
      gender: "male",
      type: "STANDARD",
      description: "Giọng bé trai trong sáng, dễ thương, tự nhiên và gần gũi, phù hợp cho các nội dung thiếu nhi, sách nói, truyện cổ tích, giáo dục cho bé",
      avatar: "https://vbee-studio-data.s3.ap-southeast-1.amazonaws.com/images/voices/round/viet-bach.png",
      is_premium: false,
      sample_audio: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_male_vietbach_child_22k-vc.mp3",
      language: {
        id: 1,
        name: "Tiếng Việt",
        code: "vi-VN"
      },
      category: {
        id: 3,
        name: "Thiếu nhi",
        code: "children"
      }
    },
    {
      id: 5,
      name: "SG - Tường Vy",
      code: "sg_female_tuongvy_call_44k-fhg",
      gender: "female",
      type: "PREMIUM",
      description: "Giọng nữ thân thiện, dễ nghe, phù hợp cho nội dung hướng dẫn, kể chuyện, quảng cáo nhẹ nhàng hoặc giao tiếp dịch vụ khách hàng.",
      avatar: "https://vbee-studio-data.s3.ap-southeast-1.amazonaws.com/images/voices/round/tuong-vy.png",
      is_premium: true,
      sample_audio: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/sg_female_tuongvy_call_44k-fhg.mp3",
      language: {
        id: 1,
        name: "Tiếng Việt",
        code: "vi-VN"
      },
      category: {
        id: 4,
        name: "Tổng đài",
        code: "callcenter"
      }
    },
    {
      id: 6,
      name: "HN - Hà Chi",
      code: "hn_female_hachi_book_22k-vc",
      gender: "female",
      type: "STANDARD",
      description: "Giọng nữ chậm rãi, nhấn nhá tự nhiên, phù hợp cho thuyết minh, đọc tin tức hoặc trình bày nội dung chuyên nghiệp",
      avatar: "https://vbee-studio-data.s3.ap-southeast-1.amazonaws.com/images/voices/round/ha-chi.png",
      is_premium: false,
      sample_audio: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_female_hachi_book_22k-vc.mp3",
      language: {
        id: 1,
        name: "Tiếng Việt",
        code: "vi-VN"
      },
      category: {
        id: 5,
        name: "Kể chuyện",
        code: "story"
      }
    },
    {
      id: 7,
      name: "SG - Chí Đạt",
      code: "sg_male_chidat_ebook_48k-phg",
      gender: "male",
      type: "STANDARD",
      description: "Giọng nam truyền cảm, rõ ràng, mang lại cảm giác gần gũi, thân thiện, phù hợp cho các nội dung thuyết minh, kể chuyện, tin tức",
      avatar: "https://vbee-studio-data.s3.ap-southeast-1.amazonaws.com/images/voices/round/chi-dat.png",
      is_premium: false,
      sample_audio: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/sg_male_chidat_ebook_48k-phg.wav",
      language: {
        id: 1,
        name: "Tiếng Việt",
        code: "vi-VN"
      },
      category: {
        id: 6,
        name: "Sách nói",
        code: "book"
      }
    },
    {
      id: 8,
      name: "SG - Thảo Trinh",
      code: "sg_female_thaotrinh_full_44k-phg",
      gender: "female",
      type: "PREMIUM",
      description: "Giọng nữ nhẹ nhàng, chậm rãi, nhấn nhá phù hợp với các nội dung thuyết minh, kể chuyện, podcast, sách nói.",
      avatar: "https://vbee-studio-data.s3.ap-southeast-1.amazonaws.com/images/voices/round/thao-trinh.png",
      is_premium: true,
      sample_audio: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/sg_female_thaotrinh_full_44k-phg.mp3",
      language: {
        id: 1,
        name: "Tiếng Việt",
        code: "vi-VN"
      },
      category: {
        id: 4,
        name: "Tổng đài",
        code: "callcenter"
      }
    },
    {
      id: 9,
      name: "HN - Anh Khôi",
      code: "hn_male_phuthang_stor80dt_48k-fhg",
      gender: "male",
      type: "STANDARD",
      description: "Giọng nam trầm, nhấn nhá và đầy truyền cảm, phù hợp với các nội dung kể chuyện, lịch sử, phật pháp",
      avatar: "https://vbee-studio-data.s3.ap-southeast-1.amazonaws.com/images/voices/round/anh-khoi.png",
      is_premium: false,
      sample_audio: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_male_phuthang_stor80dt_48k-fhg.mp3",
      language: {
        id: 1,
        name: "Tiếng Việt",
        code: "vi-VN"
      },
      category: {
        id: 5,
        name: "Kể chuyện",
        code: "story"
      }
    },
    {
      id: 10,
      name: "HN - Ngọc Lan",
      code: "hn_female_hermer_stor_48k-fhg",
      gender: "female",
      type: "STANDARD",
      description: "Giọng nữ nhẹ nhàng, tình cảm, phù hợp với các nội dung sách nói, kể chuyện cho bé",
      avatar: "https://vbee-studio-data.s3.ap-southeast-1.amazonaws.com/images/voices/round/ngoc-lan.png",
      is_premium: false,
      sample_audio: "https://vbee.s3.ap-southeast-1.amazonaws.com/audios/demo/vbee/hn_female_hermer_stor_48k-fhg.mp3",
      language: {
        id: 1,
        name: "Tiếng Việt",
        code: "vi-VN"
      },
      category: {
        id: 5,
        name: "Kể chuyện",
        code: "story"
      }
    }
  ]
  