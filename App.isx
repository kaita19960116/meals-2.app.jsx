import React, { useState, useEffect } from 'react';
import { Search, Plus, ChefHat, Clock, CreditCard, X, ChevronRight, Sparkles, Loader2, ChevronLeft, Edit2, Trash2, Save, RefreshCw, PencilLine } from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isManualInput, setIsManualInput] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [editForm, setEditForm] = useState(null);
  const [manualIngredient, setManualIngredient] = useState('');

  const quickFilters = ["すべて", "鶏もも", "鶏むね", "豚ロース", "豚こま切れ", "豚バラ", "挽肉", "牛肉", "魚介", "副菜"];
  const ingredientPresets = ["鶏もも", "鶏むね", "豚ロース", "豚こま切れ", "豚バラ", "挽肉", "牛肉", "魚介", "副菜", "その他"];

  const standardizeIngredient = (text) => {
    if (!text) return "その他";
    const lower = text.toLowerCase();
    if (lower.includes("挽肉") || lower.includes("ひき肉") || lower.includes("合挽き") || lower.includes("肉みそ") || lower.includes("そぼろ")) return "挽肉";
    if (lower.includes("鶏もも") || lower.includes("鶏モモ") || lower.includes("チキンステーキ") || lower.includes("から揚げ") || lower.includes("親子丼") || (lower.includes("鶏肉") && !lower.includes("むね"))) return "鶏もも";
    if (lower.includes("鶏むね") || lower.includes("鶏ムネ") || lower.includes("棒棒鶏")) return "鶏むね";
    if (lower.includes("豚ロース") || lower.includes("トンテキ")) return "豚ロース";
    if (lower.includes("豚バラ") || lower.includes("角煮") || lower.includes("サムギョプサル")) return "豚バラ";
    if (lower.includes("豚肉") || lower.includes("豚こま") || lower.includes("生姜焼き") || lower.includes("豚キムチ") || lower.includes("回鍋肉") || lower.includes("豚もやし")) return "豚こま切れ";
    if (lower.includes("牛") || lower.includes("ビーフ")) return "牛肉";
    if (lower.includes("マグロ") || lower.includes("サーモン") || lower.includes("魚") || lower.includes("鯖") || lower.includes("アジ") || lower.includes("鮭") || lower.includes("ぶり") || lower.includes("カツオ") || lower.includes("鰆")) return "魚介";
    if (lower.includes("浸し") || lower.includes("野菜") || lower.includes("小松菜") || lower.includes("ナムル") || lower.includes("ピーマン") || lower.includes("菊菜")) return "副菜";
    return text;
  };

  const initialFullMenu = [
    // 魚介
    { id: 101, title: "マグロアボカド丼", ingredient: "マグロ", tag: "魚介", time: "10分", cost: "600円", ingredients: ["マグロ: 100g", "アボカド: 1/2個", "醤油・わさび: 適量"], steps: ["具材を角切りにする", "タレと和えてご飯にのせる"] },
    { id: 102, title: "サーモンアボカド丼", ingredient: "サーモン", tag: "魚介", time: "10分", cost: "600円", ingredients: ["サーモン: 100g", "アボカド: 1/2個", "マヨネーズ・醤油: 適量"], steps: ["具材を切る", "ご飯に盛り付ける"] },
    { id: 103, title: "鰆の塩焼き", ingredient: "鰆", tag: "魚介", time: "15分", cost: "400円", ingredients: ["鰆: 2切れ", "塩: 少々"], steps: ["鯖に塩を振る", "グリルで両面焼く"] },
    { id: 104, title: "カツオのたたき", ingredient: "カツオ", tag: "魚介", time: "5分", cost: "500円", ingredients: ["カツオたたき: 1柵", "ポン酢・薬味: 適量"], steps: ["厚めに切る", "薬味をのせてポン酢をかける"] },
    { id: 105, title: "ぶり大根", ingredient: "ぶり", tag: "魚介", time: "40分", cost: "600円", ingredients: ["ぶり切り身: 2切れ", "大根: 1/4本", "醤油・酒・砂糖: 適量"], steps: ["大根を下茹でする", "ぶりを湯通しする", "一緒に煮込む"] },
    { id: 106, title: "鮭のムニエル", ingredient: "鮭", tag: "魚介", time: "15分", cost: "400円", ingredients: ["鮭: 2切れ", "バター: 10g", "小麦粉: 適量"], steps: ["鮭に粉をまぶす", "バターでカリッと焼く"] },
    
    // 鶏肉
    { id: 201, title: "鶏チキンステーキ", ingredient: "鶏もも", tag: "鶏もも", time: "20分", cost: "400円", ingredients: ["鶏もも肉: 1枚", "塩胡椒: 少々", "ニンニク: 1片"], steps: ["皮目からじっくり焼く", "裏返して蒸し焼きにする"] },
    { id: 202, title: "油淋鶏", ingredient: "鶏もも", tag: "鶏もも", time: "25分", cost: "500円", ingredients: ["鶏もも肉: 1枚", "長ねぎ: 1/4本", "甘酢ダレ: 適量"], steps: ["肉を揚げ焼きにする", "刻みねぎ入りのタレをかける"] },
    { id: 203, title: "鶏肉とブロッコリーのクリーム煮", ingredient: "鶏もも", tag: "鶏もも", time: "20分", cost: "500円", ingredients: ["鶏肉: 200g", "ブロッコリー: 1/2株", "牛乳: 200ml"], steps: ["具材を炒める", "薄力粉を絡める", "牛乳で煮る"] },
    { id: 204, title: "鶏肉カレー", ingredient: "鶏もも", tag: "鶏もも", time: "30分", cost: "600円", ingredients: ["鶏肉: 200g", "玉ねぎ: 1個", "カレールー: 1/2個"], steps: ["野菜と肉を炒める", "水で煮込んでルーを溶かす"] },
    { id: 205, title: "カオマンガイ", ingredient: "鶏もも", tag: "鶏もも", time: "40分", cost: "450円", ingredients: ["鶏もも肉: 1枚", "お米: 2合", "生姜・ニンニク: 適量"], steps: ["炊飯器に米と鶏肉を入れ炊く", "タレを作る"] },
    { id: 206, title: "鶏モモコチュジャン炒め", ingredient: "鶏もも", tag: "鶏もも", time: "15分", cost: "400円", ingredients: ["鶏肉: 250g", "コチュジャン: 大さじ1", "キャベツ: 適量"], steps: ["肉を焼く", "調味料と野菜を合わせ炒める"] },
    { id: 207, title: "タンドリーチキン", ingredient: "鶏もも", tag: "鶏もも", time: "20分", cost: "450円", ingredients: ["鶏肉: 250g", "ヨーグルト: 大さじ2", "カレー粉: 適量"], steps: ["調味料に漬け込む", "フライパンで焼く"] },
    { id: 208, title: "鶏肉の甘辛煮", ingredient: "鶏もも", tag: "鶏もも", time: "20分", cost: "400円", ingredients: ["鶏肉: 250g", "醤油・酒・みりん: 各大さじ2"], steps: ["肉を炒める", "調味料で照りが出るまで煮る"] },
    { id: 209, title: "鶏のから揚げ", ingredient: "鶏もも", tag: "鶏もも", time: "25分", cost: "500円", ingredients: ["鶏もも肉: 300g", "醤油・酒: 各大さじ1", "片栗粉: 適量"], steps: ["下味をつける", "片栗粉をまぶして揚げる"] },
    { id: 210, title: "親子丼", ingredient: "鶏もも", tag: "鶏もも", time: "15分", cost: "350円", ingredients: ["鶏肉: 100g", "玉ねぎ: 1/4個", "卵: 2個"], steps: ["具材を割り下で煮る", "卵でとじる"] },
    { id: 211, title: "鶏むね肉のから揚げ", ingredient: "鶏むね", tag: "鶏むね", time: "20分", cost: "300円", ingredients: ["鶏むね肉: 300g", "マヨネーズ: 少々", "片栗粉: 適量"], steps: ["そぎ切りにする", "マヨで揉んでから揚げる"] },
    { id: 212, title: "棒棒鶏", ingredient: "鶏むね", tag: "鶏むね", time: "15分", cost: "350円", ingredients: ["鶏むね肉: 1枚", "きゅうり: 1本", "ごまダレ: 適量"], steps: ["鶏肉を茹でて裂く", "きゅうりの上にのせタレをかける"] },
    { id: 213, title: "鶏肉白菜クリーム煮", ingredient: "鶏肉", tag: "鶏もも", time: "25分", cost: "450円", ingredients: ["鶏肉: 200g", "白菜: 1/4玉", "クリームシチューの素: 適量"], steps: ["具材を炒めて煮る", "ルーを加える"] },

    // 豚肉
    { id: 301, title: "豚の生姜焼き", ingredient: "豚こま切れ", tag: "豚こま切れ", time: "15分", cost: "400円", ingredients: ["豚肉: 200g", "玉ねぎ: 1/2個", "生姜: 適量"], steps: ["肉に粉をまぶし焼く", "調味料を絡める"] },
    { id: 302, title: "豚キムチ", ingredient: "豚肉", tag: "豚こま切れ", time: "10分", cost: "400円", ingredients: ["豚肉: 150g", "キムチ: 100g", "ニラ: 1/2束"], steps: ["肉を炒める", "キムチとニラを加える"] },
    { id: 303, title: "豚もやし（レンジ）", ingredient: "豚肉", tag: "豚こま切れ", time: "8分", cost: "300円", ingredients: ["豚バラ肉: 100g", "もやし: 1袋", "ポン酢: 適量"], steps: ["耐熱容器に重ねて入れる", "レンジで加熱しポン酢で食べる"] },
    { id: 304, title: "回鍋肉", ingredient: "豚バラ", tag: "豚バラ", time: "15分", cost: "500円", ingredients: ["豚バラ肉: 150g", "キャベツ: 1/4玉", "甜面醤: 大さじ1"], steps: ["肉を炒める", "キャベツとタレを加え強火で炒める"] },
    { id: 305, title: "豚の角煮", ingredient: "豚バラ", tag: "豚バラ", time: "90分", cost: "800円", ingredients: ["豚バラブロック: 400g", "生姜: 1片", "ゆで卵: 2個"], steps: ["肉を下茹でする", "調味料でじっくり煮込む"] },
    { id: 306, title: "サムギョプサル", ingredient: "豚バラ", tag: "豚バラ", time: "20分", cost: "700円", ingredients: ["豚バラ厚切り: 300g", "サンチュ: 適量", "キムチ: 適量"], steps: ["肉をカリカリに焼く", "サンチュで包んで食べる"] },
    { id: 307, title: "スペアリブ", ingredient: "スペアリブ", tag: "豚バラ", time: "40分", cost: "900円", ingredients: ["豚スペアリブ: 500g", "マーマレード: 大さじ2", "醤油: 大さじ2"], steps: ["肉に焼き目をつける", "調味料で煮詰める"] },
    { id: 308, title: "豚ローストンテキ", ingredient: "豚ロース", tag: "豚ロース", time: "15分", cost: "500円", ingredients: ["豚ロース肉: 2枚", "ウスターソース: 大さじ2", "ケチャップ: 大さじ1"], steps: ["肉の筋を切る", "両面焼きソースを絡める"] },
    { id: 309, title: "豚ロースの水菜巻き", ingredient: "豚ロース", tag: "豚ロース", time: "15分", cost: "450円", ingredients: ["豚ロース薄切り: 150g", "水菜: 1/2株"], steps: ["水菜を肉で巻く", "フライパンで焼きポン酢で仕上げる"] },
    { id: 310, title: "豚肉とナスの甘辛炒め", ingredient: "豚肉", tag: "豚こま切れ", time: "15分", cost: "400円", ingredients: ["豚肉: 150g", "ナス: 2本", "味噌・砂糖: 各適量"], steps: ["ナスを油で炒める", "肉を合わせ調味料で味付け"] },
    { id: 311, title: "豚ロース肉のナス巻き", ingredient: "豚ロース", tag: "豚ロース", time: "20分", cost: "500円", ingredients: ["豚ロース肉: 150g", "ナス: 1本"], steps: ["細切りナスを肉で巻く", "甘辛く焼く"] },

    // 牛肉・挽肉・その他
    { id: 401, title: "牛丼", ingredient: "牛肉", tag: "牛肉", time: "15分", cost: "550円", ingredients: ["牛バラ肉: 150g", "玉ねぎ: 1/2個", "つゆ: 適量"], steps: ["玉ねぎを煮る", "肉を加えサッと火を通す"] },
    { id: 402, title: "牛肉の甘辛煮", ingredient: "牛肉", tag: "牛肉", time: "15分", cost: "600円", ingredients: ["牛細切れ肉: 200g", "生姜: 適量", "醤油・砂糖: 各大さじ2"], steps: ["生姜と肉を炒める", "調味料を加え煮詰める"] },
    { id: 403, title: "ハンバーグ", ingredient: "挽肉", tag: "挽肉", time: "30分", cost: "500円", ingredients: ["合挽肉: 300g", "玉ねぎ: 1/2個", "パン粉: 適量"], steps: ["玉ねぎを炒めて冷ます", "肉と混ぜて成形し焼く"] },
    { id: 404, title: "トマト煮込みハンバーグ", ingredient: "挽肉", tag: "挽肉", time: "35分", cost: "600円", ingredients: ["ハンバーグだね: 2個分", "トマト缶: 1/2缶"], steps: ["ハンバーグを焼きトマト缶で煮込む"] },
    { id: 405, title: "肉そぼろ甘辛炒め", ingredient: "挽肉", tag: "挽肉", time: "10分", cost: "350円", ingredients: ["鶏または豚挽肉: 200g", "醤油・砂糖: 各大さじ2"], steps: ["ポロポロになるまで炒める", "調味料を煮絡める"] },
    { id: 406, title: "麻婆豆腐", ingredient: "挽肉", tag: "挽肉", time: "15分", cost: "400円", ingredients: ["挽肉: 100g", "豆腐: 1丁", "豆板醤: 適量"], steps: ["肉と豆板醤を炒める", "豆腐を加え煮る", "トロミをつける"] },
    { id: 407, title: "チーズタッカルビ", ingredient: "鶏もも", tag: "鶏もも", time: "25分", cost: "600円", ingredients: ["鶏肉: 250g", "キャベツ: 1/4玉", "チーズ: 適量"], steps: ["甘辛く炒める", "中央にチーズを溶かす"] },

    // 副菜・その他
    { id: 501, title: "野菜炒め", ingredient: "野菜", tag: "副菜", time: "10分", cost: "300円", ingredients: ["キャベツ・人参・もやし: 適量", "豚肉: 少し"], steps: ["強火で一気に炒める"] },
    { id: 502, title: "ベーコンとピーマン炒め", ingredient: "ピーマン", tag: "副菜", time: "5分", cost: "200円", ingredients: ["ピーマン: 3個", "ベーコン: 2枚"], steps: ["細切りにしてサッと炒める"] },
    { id: 503, title: "小松菜のお浸し", ingredient: "小松菜", tag: "副菜", time: "5分", cost: "150円", ingredients: ["小松菜: 1束", "だし汁・醤油: 適量"], steps: ["茹でて水にさらす", "つゆに漬ける"] },
    { id: 504, title: "菊菜のお浸し", ingredient: "菊菜", tag: "副菜", time: "5分", cost: "200円", ingredients: ["菊菜: 1束", "白だし: 適量"], steps: ["サッと茹でて和える"] },
    { id: 505, title: "野菜の蒸し焼き", ingredient: "野菜", tag: "副菜", time: "10分", cost: "250円", ingredients: ["季節の野菜: 適量", "酒: 大さじ1"], steps: ["蓋をして弱火で蒸す"] }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('my-recipes-v18');
    if (saved) {
      setRecipes(JSON.parse(saved));
    } else {
      setRecipes(initialFullMenu);
    }
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      localStorage.setItem('my-recipes-v18', JSON.stringify(recipes));
    }
  }, [recipes]);

  const generateRecipeFromAI = async (dishName) => {
    const apiKey = "";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{
        parts: [{
          text: `あなたはプロの料理研究家です。以下の料理のレシピをJSON形式で作成してください。料理名: "${dishName}"。返却するJSONの構造: {"ingredients": ["材料名と分量の配列"], "steps": ["調理工程の配列"], "cost": "予算", "time": "時間", "mainCategory": "主菜の材料"}`
        }]
      }],
      generationConfig: { responseMimeType: "application/json" }
    };

    const fetchWithRetry = async (retries = 3) => {
      for (let i = 0; i <= retries; i++) {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const data = await response.json();
          return JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text);
        } catch (error) {
          if (i === retries) throw error;
          await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        }
      }
    };

    try {
      return await fetchWithRetry();
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    
    if (isManualInput) {
      const newRecipe = {
        id: Date.now(),
        title: title,
        ingredient: manualIngredient,
        time: formData.get('time') + "分",
        cost: formData.get('cost') + "円",
        ingredients: formData.get('ingredients').split('\n').filter(i => i.trim()),
        steps: formData.get('steps').split('\n').filter(s => s.trim()),
        tag: standardizeIngredient(manualIngredient)
      };
      setRecipes(prev => [newRecipe, ...prev]);
      setIsAdding(false);
      setIsManualInput(false);
      setManualIngredient('');
    } else {
      setIsGenerating(true);
      const aiData = await generateRecipeFromAI(title);
      if (aiData) {
        const newRecipe = {
          id: Date.now(),
          title: title,
          ingredient: aiData.mainCategory || "その他",
          time: aiData.time || "--",
          cost: aiData.cost || "--",
          ingredients: aiData.ingredients || [],
          steps: aiData.steps || [],
          tag: standardizeIngredient(aiData.mainCategory || "")
        };
        setRecipes(prev => [newRecipe, ...prev]);
        setIsAdding(false);
      } else {
        alert("AI生成に失敗しました。手動入力をお試しください。");
      }
      setIsGenerating(false);
    }
  };

  const handleRegenerateInEdit = async () => {
    if (!editForm || !editForm.title) return;
    setIsRegenerating(true);
    const aiData = await generateRecipeFromAI(editForm.title);
    if (aiData) {
      setEditForm(prev => ({
        ...prev,
        time: aiData.time,
        cost: aiData.cost,
        ingredients: aiData.ingredients,
        steps: aiData.steps,
        ingredient: aiData.mainCategory,
        tag: standardizeIngredient(aiData.mainCategory)
      }));
    }
    setIsRegenerating(false);
  };

  const handleSaveEdit = () => {
    const updatedRecipe = {
      ...editForm,
      tag: standardizeIngredient(editForm.ingredient)
    };
    setRecipes(prev => prev.map(r => r.id === editForm.id ? updatedRecipe : r));
    setSelectedRecipe(updatedRecipe);
    setIsEditing(false);
  };

  const startEditing = () => {
    setEditForm({...selectedRecipe});
    setIsEditing(true);
  };

  const filteredRecipes = recipes.filter(r => {
    const searchLower = searchTerm.toLowerCase();
    if (searchTerm === "すべて" || searchTerm === "") return true;
    return (
      r.title.toLowerCase().includes(searchLower) || 
      r.ingredient.toLowerCase().includes(searchLower) || 
      (r.tag && r.tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <ChefHat className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-black tracking-widest text-white uppercase italic text-shadow">REPERTOIRE</h1>
        </div>
        <button onClick={() => {setIsAdding(true); setIsManualInput(false); setManualIngredient('');}} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-transform">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </header>

      <main className="px-4 py-6 space-y-6 pb-32">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="料理名、食材名で検索"
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-orange-500/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {quickFilters.map(filter => (
              <button
                key={filter}
                onClick={() => setSearchTerm(filter === "すべて" ? "" : filter)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black transition-all border ${
                  (searchTerm === filter || (filter === "すべて" && searchTerm === ""))
                    ? "bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/20"
                    : "bg-slate-800 border-white/5 text-slate-400 hover:border-white/20"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {filteredRecipes.length > 0 ? filteredRecipes.map(recipe => (
            <div key={recipe.id} onClick={() => setSelectedRecipe(recipe)} className="bg-slate-800/40 p-5 rounded-2xl border border-white/5 active:scale-[0.98] transition-all flex items-center gap-4 cursor-pointer hover:bg-slate-800/60">
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-1">{recipe.tag}</span>
                <h3 className="font-black text-white text-base truncate">{recipe.title}</h3>
                <div className="flex gap-4 text-[10px] text-slate-400 font-bold mt-1">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recipe.time}</span>
                  <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> {recipe.cost}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </div>
          )) : (
            <div className="text-center py-20 text-slate-600">
               <p className="font-bold">レシピが見つかりません</p>
            </div>
          )}
        </div>
      </main>

      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col overflow-hidden">
          <div className="p-4 flex items-center gap-4 border-b border-white/5 bg-slate-900/50">
            <button onClick={() => {setSelectedRecipe(null); setIsEditing(false);}} className="p-2 bg-white/5 rounded-xl"><ChevronLeft className="w-6 h-6 text-white" /></button>
            <h2 className="flex-1 text-lg font-black truncate text-white">{isEditing ? "レシピを編集" : selectedRecipe.title}</h2>
            {!isEditing && (
              <div className="flex gap-2">
                <button onClick={() => { if(window.confirm("削除しますか？")) { setRecipes(recipes.filter(r => r.id !== selectedRecipe.id)); setSelectedRecipe(null); }}} className="p-2 text-red-400 bg-red-400/10 rounded-xl active:scale-95 transition-transform"><Trash2 className="w-5 h-5" /></button>
                <button onClick={startEditing} className="p-2 text-blue-400 bg-blue-400/10 rounded-xl active:scale-95 transition-transform"><Edit2 className="w-5 h-5" /></button>
              </div>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isEditing ? (
              <div className="space-y-6 pb-20 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">料理名</label>
                    <button onClick={handleRegenerateInEdit} disabled={isRegenerating} className="flex items-center gap-1 text-[10px] font-black text-orange-400 uppercase bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20 disabled:opacity-50">
                      {isRegenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                      AIで再構成
                    </button>
                  </div>
                  <input className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white font-bold outline-none focus:ring-2 focus:ring-orange-500/50" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">食材分類の選択</label>
                  <div className="flex flex-wrap gap-2">
                    {ingredientPresets.map(item => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setEditForm({...editForm, ingredient: item})}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black border transition-all ${
                          editForm.ingredient === item
                            ? "bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/20"
                            : "bg-slate-800 border-white/10 text-slate-400"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <input className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white font-bold outline-none focus:ring-2 focus:ring-orange-500/50" value={editForm.ingredient} onChange={e => setEditForm({...editForm, ingredient: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">調理時間</label>
                    <input className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white font-bold outline-none focus:ring-2 focus:ring-orange-500/50" value={editForm.time} onChange={e => setEditForm({...editForm, time: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">目安費用</label>
                    <input className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white font-bold outline-none focus:ring-2 focus:ring-orange-500/50" value={editForm.cost} onChange={e => setEditForm({...editForm, cost: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">材料 (1行ずつ)</label>
                  <textarea rows={6} className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white text-sm outline-none focus:ring-2 focus:ring-orange-500/50" value={editForm.ingredients.join('\n')} onChange={e => setEditForm({...editForm, ingredients: e.target.value.split('\n')})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">手順 (1行ずつ)</label>
                  <textarea rows={8} className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white text-sm outline-none focus:ring-2 focus:ring-orange-500/50" value={editForm.steps.join('\n')} onChange={e => setEditForm({...editForm, steps: e.target.value.split('\n')})} />
                </div>
                <button onClick={handleSaveEdit} className="w-full py-5 bg-orange-500 text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-transform"><Save className="w-5 h-5" /> 変更を保存</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center shadow-inner">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">調理時間</p>
                    <p className="text-lg font-black text-orange-500">{selectedRecipe.time}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center shadow-inner">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">目安費用</p>
                    <p className="text-lg font-black text-orange-500">{selectedRecipe.cost}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-black border-l-2 border-orange-500 pl-3 uppercase tracking-widest text-white">材料</h4>
                  <div className="grid gap-2">
                    {selectedRecipe.ingredients?.map((item, i) => (
                      <div key={i} className="p-4 bg-slate-800/30 rounded-xl border border-white/5 text-sm font-bold text-slate-300">{item}</div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4 pb-20">
                  <h4 className="text-xs font-black border-l-2 border-orange-500 pl-3 uppercase tracking-widest text-white">作り方</h4>
                  <div className="space-y-4">
                    {selectedRecipe.steps?.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center font-black text-xs border border-orange-500/30">{i + 1}</div>
                        <p className="text-slate-400 text-sm font-bold leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isAdding && (
        <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col overflow-y-auto">
          <div className="p-4 flex items-center justify-between border-b border-white/5 bg-slate-900/50 sticky top-0 z-10">
            <h2 className="text-lg font-black text-white">{isManualInput ? "手動でレシピを作成" : "新規レシピ作成"}</h2>
            <button onClick={() => {setIsAdding(false); setIsManualInput(false); setManualIngredient('');}} className="p-2 bg-white/5 rounded-xl"><X className="w-6 h-6 text-white" /></button>
          </div>
          <div className="p-6 pb-20">
            <form onSubmit={handleAddRecipe} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-wider">料理名</label>
                <input required name="title" className="w-full px-5 py-5 bg-slate-800 border border-white/10 rounded-2xl text-white font-black text-xl placeholder:text-slate-600 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="例：肉じゃが" />
              </div>

              {!isManualInput ? (
                <div className="space-y-4">
                  <button disabled={isGenerating} type="submit" className="w-full py-6 bg-orange-500 text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-orange-500/30 active:scale-[0.98] transition-all disabled:opacity-50">
                    {isGenerating ? <Loader2 className="animate-spin w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
                    {isGenerating ? "生成中..." : "AIでレシピを作成"}
                  </button>
                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black"><span className="bg-[#020617] px-4 text-slate-500 tracking-widest">または</span></div>
                  </div>
                  <button type="button" onClick={() => setIsManualInput(true)} className="w-full py-5 bg-white/5 text-slate-300 rounded-2xl font-black border border-white/10 flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                    <PencilLine className="w-5 h-5" /> 手動で入力を開始
                  </button>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">食材分類の選択</label>
                    <div className="flex flex-wrap gap-2">
                      {ingredientPresets.map(item => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setManualIngredient(item)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black border transition-all ${
                            manualIngredient === item
                              ? "bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/20"
                              : "bg-slate-800 border-white/10 text-slate-400"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    <input required value={manualIngredient} onChange={(e) => setManualIngredient(e.target.value)} className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white font-bold focus:ring-2 focus:ring-orange-500 outline-none" placeholder="例：豚肉 (または上から選択)" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-1">時間(分)</label>
                      <input required type="number" name="time" className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white font-bold outline-none focus:ring-2 focus:ring-orange-500/50" placeholder="20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-1">費用(円)</label>
                      <input required type="number" name="cost" className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white font-bold outline-none focus:ring-2 focus:ring-orange-500/50" placeholder="500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">材料 (1行に1つ)</label>
                    <textarea required name="ingredients" rows={4} className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white text-sm outline-none focus:ring-2 focus:ring-orange-500/50" placeholder="豚肉 200g&#10;玉ねぎ 1/2個" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">手順 (1行に1ステップ)</label>
                    <textarea required name="steps" rows={4} className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white text-sm outline-none focus:ring-2 focus:ring-orange-500/50" placeholder="野菜を切る&#10;肉を炒める" />
                  </div>
                  <button type="submit" className="w-full py-6 bg-orange-500 text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition-transform">
                    <Save className="w-5 h-5" /> レシピを保存
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
