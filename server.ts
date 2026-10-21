import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '15mb' }));

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for Gemini text generation with error fallback
async function generateGeminiContent(prompt: string, systemInstruction?: string, isJson: boolean = false) {
  if (!apiKey) {
    throw new Error('MISSING_API_KEY');
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
    config: {
      systemInstruction: systemInstruction || 'Bạn là trợ lý AI chuyên gia giáo dục Ngữ văn và GDCD THCS theo chương trình GDPT 2018 tại Trường THCS Huỳnh Thúc Kháng.',
      temperature: 0.7,
      responseMimeType: isJson ? 'application/json' : 'text/plain',
    },
  });

  return response.text;
}

// 1. MIND MAP GENERATION API
app.post('/api/gemini/generate-mindmap', async (req, res) => {
  try {
    const { topic, grade, detailLevel = 'standard' } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'Vui lòng cung cấp chủ đề sơ đồ tư duy' });
    }

    const systemInstruction = `Bạn là chuyên gia thiết kế Sơ đồ tư duy Ngữ văn & GDCD THCS theo Chương trình GDPT 2018 cho Trường THCS Huỳnh Thúc Kháng.
Hãy tạo một cấu trúc sơ đồ tư duy hoàn chỉnh, khoa học, logic cao bằng Tiếng Việt.
BẮT BUỘC trả về dữ liệu chuẩn JSON với cấu trúc:
{
  "title": "Tên chủ đề sơ đồ",
  "centralNode": {
    "label": "Tên nút trung tâm",
    "description": "Mô tả ngắn gọn, súc tích",
    "color": "#102A43",
    "icon": "book-open"
  },
  "branches": [
    {
      "label": "Tên nhánh chính 1 (ví dụ: Ngoại hình / Hoàn cảnh / Luận điểm 1)",
      "description": "Tóm tắt ý chính",
      "color": "#0F9D92",
      "icon": "user",
      "subbranches": [
        {
          "label": "Tên nhánh phụ 1.1",
          "description": "Chi tiết, dẫn chứng hoặc từ khóa đắt giá",
          "color": "#0F9D92"
        },
        {
          "label": "Tên nhánh phụ 1.2",
          "description": "Chi tiết, dẫn chứng hoặc từ khóa đắt giá",
          "color": "#0F9D92"
        },
        {
          "label": "Tên nhánh phụ 1.3",
          "description": "Chi tiết, dẫn chứng hoặc từ khóa đắt giá",
          "color": "#0F9D92"
        }
      ]
    }
  ]
}
YÊU CẦU ĐẶC BIỆT:
- Tạo từ 4 đến 6 nhánh chính rõ ràng, bao quát đầy đủ nội dung bài học.
- Mỗi nhánh chính PHẢI có ít nhất 3 nhánh phụ với từ khóa và dẫn chứng xác thực.
- Sử dụng các màu sắc sư phạm tươi sáng: '#0F9D92', '#E6B450', '#2563EB', '#E11D48', '#8B5CF6', '#10B981'.
- Icon phù hợp (ví dụ: 'book-open', 'user', 'heart', 'feather', 'lightbulb', 'award', 'scale', 'sparkles').`;

    const prompt = `Hãy tạo sơ đồ tư duy chi tiết cho bài học: "${topic}", dành cho học sinh Lớp ${grade || 6}. 
Mức độ chi tiết: ${detailLevel}.
Hãy chọn lọc từ khóa đắt giá, luận điểm sáng rõ và bài học sâu sắc.`;

    const responseText = await generateGeminiContent(prompt, systemInstruction, true);
    let parsedData;
    try {
      parsedData = JSON.parse(responseText || '{}');
    } catch {
      return res.status(500).json({ error: 'Không thể phân tích phản hồi JSON từ AI' });
    }

    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error generating mindmap:', error);
    res.status(500).json({
      error: error.message === 'MISSING_API_KEY' ? 'Chưa cấu hình GEMINI_API_KEY' : 'Lỗi hệ thống khi tạo sơ đồ tư duy',
      details: error.message,
    });
  }
});

// 2. READING COMPREHENSION API
app.post('/api/gemini/reading-analysis', async (req, res) => {
  try {
    const { grade, textTitle, author, textContent, bookSet } = req.body;
    const systemInstruction = `Bạn là chuyên gia giảng dạy Ngữ văn THCS theo GDPT 2018 tại THCS Huỳnh Thúc Kháng.
Hãy tạo bộ câu hỏi đọc hiểu 4 cấp độ (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao) bám sát văn bản, kèm đáp án gợi ý và hướng dẫn suy luận.
Trả về JSON:
{
  "summary": "Tóm tắt ngắn gọn tác phẩm trong 2-3 câu",
  "mainTheme": "Chủ đề chính",
  "questions": [
    {
      "id": 1,
      "level": "Nhận biết",
      "question": "Câu hỏi nhận biết...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctOptionIndex": 0,
      "textEvidence": "Căn cứ từ ngữ/chi tiết trong văn bản",
      "explanation": "Lời giải thích rõ ràng cho học sinh"
    },
    {
      "id": 2,
      "level": "Thông hiểu",
      "question": "Câu hỏi thông hiểu...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctOptionIndex": 1,
      "textEvidence": "Căn cứ phân tích ngữ cảnh",
      "explanation": "Lời giải thích cặn kẽ"
    },
    {
      "id": 3,
      "level": "Vận dụng",
      "question": "Câu hỏi vận dụng...",
      "hint": "Gợi ý hướng liên hệ thực tế hoặc nghệ thuật tác phẩm",
      "sampleAnswer": "Câu trả lời mẫu gợi ý"
    },
    {
      "id": 4,
      "level": "Vận dụng cao",
      "question": "Câu hỏi vận dụng cao (bài học nhân văn, tư duy phản biện)...",
      "hint": "Gợi ý suy ngẫm sâu sắc",
      "sampleAnswer": "Câu trả lời mẫu định hướng"
    }
  ]
}`;

    const prompt = `Phân tích đọc hiểu tác phẩm "${textTitle || 'Bài học đường đời đầu tiên'}" (Tác giả: ${author || 'Tô Hoài'}) cho học sinh lớp ${grade || 6}, bộ sách ${bookSet || 'Kết nối tri thức / Cánh diều'}.
Văn bản / trích đoạn: ${textContent ? textContent.slice(0, 1500) : 'Trích đoạn tiêu biểu trong SGK'}`;

    const responseText = await generateGeminiContent(prompt, systemInstruction, true);
    res.json({ success: true, data: JSON.parse(responseText || '{}') });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 3. ESSAY WRITING WORKSHOP CRITIQUE API
app.post('/api/gemini/critique-writing', async (req, res) => {
  try {
    const { essayType, prompt: essayPrompt, studentText, grade } = req.body;
    const systemInstruction = `Bạn là Trưởng bộ môn Ngữ văn THCS Huỳnh Thúc Kháng, chấm và nhận xét bài văn học sinh theo 7 tiêu chí chuẩn GDPT 2018:
1. Đúng yêu cầu thể loại & đề bài (Thang 10)
2. Nội dung & cảm xúc chân thật (Thang 10)
3. Bố cục 3 phần rõ ràng, mạch lạc (Thang 10)
4. Lập luận và dẫn chứng (Thang 10)
5. Diễn đạt & vốn từ phong phú (Thang 10)
6. Chính tả & ngữ pháp (Thang 10)
7. Sáng tạo & tư duy cá nhân (Thang 10)

KHÔNG viết lại toàn bộ bài văn thay học sinh. Hãy chỉ ra điểm khen ngợi cụ thể, điểm cần sửa kèm câu gợi ý viết lại hay hơn.
Trả về định dạng JSON:
{
  "totalScore": 8.5,
  "generalFeedback": "Nhận xét khích lệ tổng quan mang tính sư phạm",
  "criteriaScores": {
    "correctGenre": 9,
    "contentEmotion": 8.5,
    "structure": 8,
    "argumentsEvidence": 8.5,
    "vocabulary": 8,
    "grammarSpelling": 9,
    "creativity": 8.5
  },
  "strengths": ["Điểm mạnh 1", "Điểm mạnh 2"],
  "improvements": [
    {
      "originalSentence": "Câu văn của học sinh cần cải thiện",
      "reason": "Lý do (lặp từ, thiếu cảm xúc, diễn đạt chưa gãy gọn)",
      "suggestion": "Gợi ý câu viết lại tham khảo giàu hình ảnh hơn"
    }
  ],
  "nextStepAdvice": "Lời khuyên cho lần viết tiếp theo"
}`;

    const prompt = `Chấm và nhận xét bài làm của học sinh lớp ${grade || 7}:
Thể loại: ${essayType}
Đề bài: "${essayPrompt}"
Bài làm của học sinh:
"${studentText}"`;

    const responseText = await generateGeminiContent(prompt, systemInstruction, true);
    res.json({ success: true, data: JSON.parse(responseText || '{}') });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 4. LITERARY COURTROOM API
app.post('/api/gemini/court-dialogue', async (req, res) => {
  try {
    const { literaryWork, character, conflict, userRole, debateHistory, userArgument } = req.body;
    const systemInstruction = `Bạn là đạo diễn và các nhân vật tham gia "TÒA ÁN NHÂN VẬT VĂN HỌC" Trường THCS Huỳnh Thúc Kháng.
Tác phẩm: ${literaryWork}. Nhân vật: ${character}.
Tình huống tranh tụng: ${conflict}.
Người dùng đang đóng vai: ${userRole}.
Nhiệm vụ: Trả lời lập luận của người dùng một cách sinh động, dựa ĐÚNG sự thật trong tác phẩm (không bịa đặt sự kiện phi lý), nêu bật tính cách nhân vật hoặc lập luận của Hội thẩm đoàn AI.
Trả về JSON:
{
  "speaker": "Tên nhân vật hoặc Chủ tọa / Luật sư đối lập",
  "role": "Vai trò của người phản hồi",
  "responseMessage": "Lời thoại tranh biện mang tính kịch tính, sắc bén và đậm tính nhân văn",
  "evaluation": {
    "argumentStrength": 8.5,
    "useOfEvidence": 9.0,
    "moralLesson": "Bài học rút ra từ góc nhìn nhân văn",
    "criticalQuestion": "Một câu hỏi chất vấn ngược lại để người dùng tiếp tục tư duy"
  }
}`;

    const prompt = `Lịch sử phiên tòa: ${JSON.stringify(debateHistory || [])}.
Lập luận mới nhất của ${userRole}: "${userArgument}".
Hãy phản hồi tương tác trong phiên tòa.`;

    const responseText = await generateGeminiContent(prompt, systemInstruction, true);
    res.json({ success: true, data: JSON.parse(responseText || '{}') });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 5. CHATBOT COMPANION API (Bạn đồng hành Văn học AI)
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history, context } = req.body;
    const systemInstruction = `Bạn là "BẠN ĐỒNG HÀNH VĂN HỌC AI" của Tổ Ngữ văn – GDCD, Trường THCS Huỳnh Thúc Kháng.
Phương châm: "ĐỌC SÂU – VIẾT THẬT – NÓI HAY – SỐNG ĐẸP – TƯ DUY SÁNG RÕ".
- Luôn thân thiện, gần gũi, chuẩn mực sư phạm với lứa tuổi THCS (11-15 tuổi).
- Khuyến khích học sinh tự suy nghĩ và tìm dẫn chứng trong văn bản, không làm bài kiểm tra hộ 100%.
- Giải thích các biện pháp tu từ, cách phân tích nhân vật, gợi ý lập dàn ý, cách tạo sơ đồ tư duy.
- Khi bàn luận về hành vi và phẩm chất (GDCD), hướng đến lối sống tích cực, yêu thương gia đình, trung thực và tôn trọng sự khác biệt.`;

    const prompt = `Ngữ cảnh học tập hiện tại: ${context || 'Trang học tập chung'}.
Lịch sử trao đổi gần nhất: ${JSON.stringify(history || [])}.
Học sinh hỏi: "${message}".`;

    const responseText = await generateGeminiContent(prompt, systemInstruction, false);
    res.json({ success: true, reply: responseText });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 6. TEACHER ASSISTANT API
app.post('/api/gemini/curriculum-material', async (req, res) => {
  try {
    const { grade, lessonName, materialType, requirements } = req.body;
    const systemInstruction = `Bạn là Trợ lý Giáo viên Ngữ văn THCS chuyên nghiệp tại Trường THCS Huỳnh Thúc Kháng.
Hãy tạo tài liệu sư phạm theo yêu cầu: "${materialType}" cho bài học "${lessonName}" Lớp ${grade}.
Yêu cầu cụ thể: ${requirements}.
Định dạng trình bày chuyên nghiệp, có thể đưa vào giáo án hoặc phát trực tiếp cho học sinh.`;

    const responseText = await generateGeminiContent(requirements, systemInstruction, false);
    res.json({ success: true, content: responseText });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend in production or setup Vite in development
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Huỳnh Thúc Kháng Văn Học Sống AI Server running on port ${PORT}`);
  });
}

startServer();
