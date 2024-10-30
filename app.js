// دالة لحساب نسبة التشابه بين كلمتين
function similarity(str1, str2) {
    const longer = Math.max(str1.length, str2.length);
    if (longer === 0) return 1.0; // إذا كانت الكلمتان فارغتين
    const distance = levenshteinDistance(str1, str2);
    return (longer - distance) / longer; // حساب نسبة التشابه
}

// دالة لحساب مسافة ليفينشتاين بين كلمتين
function levenshteinDistance(a, b) {
    const matrix = [];
    for (let i = 0; i <= a.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= b.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            if (a[i - 1] === b[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1]; // لا تغيير
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // استبدال
                    Math.min(
                        matrix[i - 1][j] + 1, // حذف
                        matrix[i][j - 1] + 1 // إضافة
                    )
                );
            }
        }
    }
    return matrix[a.length][b.length];
}

// مصفوفة الأعراض تحتوي على الكلمات المفتاحية لكل عرض والنصيحة المقابلة له
const symptomsDatabase = {
    'حمى': {
        keywords: ['حمى', 'حرارة', 'سخونة', 'حراره'],
        message: 'قد تشير الأعراض إلى عدوى. يُنصح بزيارة الطبيب.'
    },
    'صداع': {
        keywords: ['صداع', 'دوخة', 'وجع راس'],
        message: 'قد تكون تعاني من إجهاد أو صداع نصفي. تأكد من الراحة والترطيب.'
    },
    'كحة': {
        keywords: ['كحة', 'سعال', 'كحه', 'كحة جافة'],
        message: 'قد يكون لديك أعراض برد. حاول شرب السوائل الدافئة.'
    },
    'آلام في الجسم': {
        keywords: ['الم في الجسم', 'تعب', 'الم عام'],
        message: 'يمكن أن تكون نتيجة لعدوى أو إرهاق. حاول الاسترخاء.'
    },
    'غثيان': {
        keywords: ['غثيان', 'دوار', 'ميل للقيء', 'استفراغ', 'ألم معدة'],
        message: 'قد يكون لديك مشكلة في المعدة. اشرب سوائل وارتاح.'
    },
    'إسهال': {
        keywords: ['اسهال', 'تلبك معوي', 'اسهال مستمر'],
        message: 'تأكد من شرب السوائل. إذا استمر، عليك مراجعة طبيب.'
    },
    'ألم في الصدر': {
        keywords: ['الم في الصدر', 'ضيق في الصدر', 'حرقة'],
        message: 'قد يكون علامة على حالة طبية خطيرة. اتصل بالطبيب أو توجه إلى الطوارئ.'
    },
    'آلام الظهر': {
        keywords: ['الم في الظهر', 'آلام الظهر', 'وجع ظهر'],
        message: 'قد يكون لديك توتر عضلي أو إجهاد. حاول الاسترخاء وقم بممارسة تمارين الإطالة.'
    },
    'آلام العظام': {
        keywords: ['الم في العظام', 'آلام العظام', 'وجع عظام'],
        message: 'يمكن أن تكون نتيجة لإجهاد أو التهاب. يفضل استشارة الطبيب إذا استمرت.'
    },
    'آلام نفسية': {
        keywords: ['آلام نفسية', 'تعب نفسي', 'ضغوط نفسية', 'اكتئاب'],
        message: 'من المهم التحدث مع مختص نفسي. حاول ممارسة الأنشطة المريحة.'
    },
    'زكام': {
        keywords: ['زكام', 'برد', 'احتقان', 'سعال'],
        message: 'قد يكون لديك زكام. حاول الراحة وشرب السوائل الدافئة. إذا استمرت الأعراض، استشر طبيب.'
    },
    'ربو': {
        keywords: ['ربو', 'أزمة ربو', 'ضيق تنفس', 'كتمة'],
        message: 'يجب تجنب المحفزات والتأكد من استخدام الأدوية المناسبة. استشر طبيبك إذا كانت الأعراض شديدة.'
    },
    'التهاب ملتحمة': {
        keywords: ['التهاب ملتحمة', 'احمرار العين', 'حكة في العين', 'تدميع'],
        message: 'قد يكون لديك التهاب ملتحمة. حاول تجنب فرك العين واستشر طبيب إذا استمرت الأعراض.'
    },
    'رؤية ضبابية': {
        keywords: ['رؤية ضبابية', 'ضعف نظر', 'صعوبة في الرؤية', 'تشوش الرؤية'],
        message: 'قد تحتاج إلى استشارة طبيب عيون. تأكد من فحص نظر العين بشكل دوري.'
    },
    'حساسية العين': {
        keywords: ['حساسية العين', 'احمرار العين', 'حكة في العين', 'تدميع'],
        message: 'تجنب المواد المسببة للحساسية واستخدم قطرات مهدئة. استشر طبيب العيون إذا استمرت الأعراض.'
    },
    'طفح جلدي': {
        keywords: ['طفح جلدي', 'حبوب', 'احمرار', 'حكة في الجسم', 'حكة في اليد', 'حكة في الرجل'],
        message: 'يمكن أن يكون لديك حساسية. تأكد من تجنب المواد المسببة للحساسية واستشر طبيب إذا استمر.'
    },
    'جفاف العين': {
        keywords: ['جفاف العين', 'حكة في العين'],
        message: 'قد تحتاج إلى قطرات مرطبة. استشر طبيب العيون إذا استمرت الأعراض.'
    },
    'قرنية': {
        keywords: ['قرنية', 'التهاب القرنية', 'جفاف القرنية', 'تمزق القرنية', 'خدش القرنية'],
        message: 'إذا كنت تعاني من ألم أو احمرار في العين، يجب عليك زيارة طبيب العيون في أسرع وقت ممكن.'
    },
    'سكري': {
        keywords: ['سكري', 'مرض السكري', 'ارتفاع السكر', 'انخفاض السكر'],
        message: 'يجب متابعة مستويات السكر لديك. تأكد من اتباع نظام غذائي مناسب واستشارة طبيبك.'
    },
    'ضغط الدم': {
        keywords: ['ضغط الدم', 'ارتفاع الضغط', 'انخفاض الضغط', 'ضغط الدم المرتفع', 'ضغط الدم المنخفض'],
        message: 'يجب متابعة ضغط الدم بانتظام. تأكد من استشارة طبيبك إذا كانت لديك أعراض مثل صداع شديد أو دوار.'
    },
    'آلام البطن': {
        keywords: ['مغص', 'الم في البطن', 'وجع بطن'],
        message: ' يمكن أن يكون لديك اضطراب في الجهاز الهضمي.او قد يكون مجرد توتر, تأكد من تناول وجبات خفيفة وارتاح.'
    },
    // أضف المزيد من الأعراض حسب الحاجة
};

// دالة تحليل الأعراض
function analyzeSymptoms() {
    const symptomsInput = document.getElementById("symptoms-input").value.toLowerCase();
    const diagnosisResult = document.getElementById("diagnosis-result");

    // تقسيم الأعراض المدخلة إلى مصفوفة باستخدام المسافات
    const symptomsArray = symptomsInput.split(' ').map(symptom => symptom.trim());

    let bestMatch = '';
    let highestSimilarity = 0;

    // مقارنة كل عرض مدخل بالكلمات المفتاحية لكل عرض في مصفوفة الأعراض
    for (let inputSymptom of symptomsArray) {
        for (let symptom in symptomsDatabase) {
            const { keywords, message } = symptomsDatabase[symptom];

            // البحث عن أي كلمة مفتاحية تتشابه مع المدخل
            for (let keyword of keywords) {
                const sim = similarity(inputSymptom, keyword);
                if (sim >= 0.5) { // تحقق مما إذا كانت نسبة التشابه 50% أو أكثر
                    if (sim > highestSimilarity) {
                        highestSimilarity = sim; // تحديث أعلى نسبة تطابق
                        bestMatch = message; // تحديث النصيحة الأكثر تطابقًا
                    }
                }
            }
        }
    }

    // إظهار النتائج
    diagnosisResult.textContent = bestMatch ? bestMatch : 'لا توجد معلومات متاحة.';
}

// دالة لإعادة ضبط الحقول
function resetFields() {
    document.getElementById("symptoms-input").value = "";
    document.getElementById("diagnosis-result").textContent = "";
}
document.addEventListener("DOMContentLoaded", function() {
    const intro = document.getElementById("intro");
    const content = document.getElementById("content");

    // انتظر لمدة 2 ثوانٍ (2000 مللي ثانية) ثم قم بإخفاء المقدمة
    setTimeout(() => {
        intro.classList.add("fadeOut"); // أضف تأثير الاختفاء
        setTimeout(() => {
            intro.style.display = "none"; // إخفاء المقدمة بعد الاختفاء
            content.style.display = "block"; // إظهار المحتوى
        }, 500); // نفس مدة الاختفاء
    }, 2000); // المدة التي ستظهر فيها المقدمة
});