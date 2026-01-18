import React, { useState, useEffect } from 'react';
import { Search, Plus, Utensils, ChefHat, Clock, CreditCard, X, ChevronRight, BookOpen, List, PlayCircle, Sparkles, Loader2, ChevronLeft } from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipes, setRecipes] = useState([]);

  // 初期データ
  const initialRecipes = [
    { id: 1, title: "鶏肉カレー", ingredient: "鶏もも肉", time: "30分", cost: "500円", ingredients: ["鶏もも肉: 250g", "玉ねぎ: 1個", "カレールー: 2皿分"], steps: ["具材を切る", "炒めて煮込む", "ルーを溶かす"], tag: "鶏肉" },
    { id: 2, title: "豚キムチ", ingredient: "豚肉, キムチ", time: "10分", cost: "400円", ingredients: ["豚バラ肉: 150g", "キムチ: 100g", "ニラ: 1/2束"], steps: ["豚肉を炒める", "キムチを加えて炒める"], tag: "豚肉" },
    { id: 3, title: "チキントマト煮込み", ingredient: "鶏肉, トマト", time: "25分", cost: "550円", ingredients: ["鶏もも肉: 1枚", "トマト缶: 1/2缶", "しめじ: 1/2株"], steps: ["肉を焼き色がつくまで焼く", "トマト缶と煮込む"], tag: "鶏肉" },
    { id: 4, title: "スペアリブ", ingredient: "豚スペアリブ", time: "40分", cost: "900円", ingredients: ["スペアリブ: 400g", "マーマレード: 大さじ2", "醤油: 大さじ2"], steps: ["肉に焼き色をつける", "調味料と弱火で煮込む"], tag: "豚肉" },
    { id: 5, title: "豚肉とナスの甘辛炒め", ingredient: "豚肉, ナス", time: "15分", cost: "400円", ingredients: ["豚こま肉: 150g", "ナス: 2本"], steps: ["ナスを炒める", "肉を加え甘辛く味付け"], tag: "豚肉" },
    { id: 6, title: "鶏肉の甘辛煮", ingredient: "鶏肉", time: "20分", cost: "400円", ingredients: ["鶏もも肉: 1枚", "醤油・酒・砂糖: 各大さじ2"], steps: ["肉を焼き、調味料で照りが出るまで煮る"], tag: "鶏肉" },
    { id: 7, title: "牛肉の甘辛煮", ingredient: "牛肉", time: "20分", cost: "700円", ingredients: ["牛細切れ肉: 200g", "生姜: 1片"], steps: ["生姜と肉を甘辛く煮付ける"], tag: "牛肉" },
    { id: 8, title: "鶏肉白菜クリーム煮", ingredient: "鶏肉, 白菜", time: "25分", cost: "450円", ingredients: ["鶏もも肉: 150g", "白菜: 1/8玉", "牛乳: 200ml"], steps: ["具材を炒め、牛乳とコンソメで煮る"], tag: "鶏肉" },
    { id: 9, title: "ハンバーグ", ingredient: "挽肉", time: "30分", cost: "500円", ingredients: ["合い挽き肉: 250g", "玉ねぎ: 1/2個", "パン粉: 適量"], steps: ["種をこねる", "両面を焼き、蒸し焼きにする"], tag: "挽肉" },
    { id: 10, title: "鶏のから揚げ", ingredient: "鶏肉", time: "25分", cost: "400円", ingredients: ["鶏もも肉: 1枚", "醤油・酒・にんにく: 各適量", "片栗粉: 適量"], steps: ["下味をつける", "片栗粉をまぶして揚げる"], tag: "鶏肉" },
    { id: 11, title: "ぶり大根", ingredient: "ぶり, 大根", time: "40分", cost: "600円", ingredients: ["ぶりの切り身: 2枚", "大根: 1/4本"], steps: ["ぶりを下処理する", "大根と甘辛く煮込む"], tag: "魚" },
    { id: 12, title: "鮭のムニエル", ingredient: "鮭", time: "15分", cost: "500円", ingredients: ["鮭の切り身: 2枚", "小麦粉: 少々", "バター: 10g"], steps: ["鮭に粉をまぶす", "バターで香ばしく焼く"], tag: "魚" },
    { id: 13, title: "回鍋肉", ingredient: "豚肉, キャベツ", time: "15分", cost: "450円", ingredients: ["豚バラ肉: 150g", "キャベツ: 1/4個", "甜麺醤: 大さじ1"], steps: ["肉と野菜を強火で炒める", "合わせ調味料を絡める"], tag: "豚肉" },
    { id: 14, title: "親子丼", ingredient: "鶏肉, 卵", time: "15分", cost: "350円", ingredients: ["鶏もも肉: 100g", "卵: 2個", "玉ねぎ: 1/4個"], steps: ["出汁で具を煮る", "卵でとじる"], tag: "鶏肉" },
    { id: 15, title: "豚ももやし（レンジ）", ingredient: "豚肉, もやし", time: "8分", cost: "250円", ingredients: ["豚バラ肉: 100g", "もやし: 1袋"], steps: ["もやしの上に肉を広げる", "レンジで5分加熱しポン酢で"], tag: "豚肉" },
    { id: 16, title: "小松菜のお浸し", ingredient: "小松菜", time: "5分", cost: "150円", ingredients: ["小松菜: 1束", "だし汁・醤油: 各適量"], steps: ["茹でて冷水にとる", "だしに浸す"], tag: "野菜" },
    { id: 17, title: "菊菜のお浸し", ingredient: "菊菜", time: "5分", cost: "200円", ingredients: ["菊菜: 1束", "醤油・かつお節: 少々"], steps: ["さっと茹でて絞り、和える"], tag: "野菜" },
    { id: 18, title: "カオマンガイ", ingredient: "鶏肉, 米", time: "45分", cost: "450円", ingredients: ["鶏もも肉: 1枚", "米: 2合", "鶏だしの素・生姜: 適量"], steps: ["炊飯器に米と肉を入れ炊く", "特製ダレをかける"], tag: "鶏肉" },
    { id: 19, title: "鶏モモコチュジャン炒め", ingredient: "鶏肉", time: "15分", cost: "400円", ingredients: ["鶏もも肉: 1枚", "コチュジャン: 大さじ1"], steps: ["肉を炒め、甘辛だれを絡める"], tag: "鶏肉" },
    { id: 20, title: "麻婆豆腐", ingredient: "挽肉, 豆腐", time: "15分", cost: "350円", ingredients: ["豆腐: 1丁", "豚挽肉: 100g", "豆板醤: 適量"], steps: ["挽肉を炒め、豆腐とソースで煮る"], tag: "挽肉" },
    { id: 21, title: "冷凍餃子", ingredient: "餃子", time: "10分", cost: "300円", ingredients: ["冷凍餃子: 12個"], steps: ["フライパンに並べ、水を入れ蒸し焼き"], tag: "その他" },
    { id: 22, title: "肉みそキャベツ", ingredient: "挽肉, キャベツ", time: "12分", cost: "300円", ingredients: ["挽肉: 100g", "キャベツ: 1/4個", "味噌: 大さじ1"], steps: ["キャベツを炒め肉みそを合わせる"], tag: "挽肉" },
    { id: 23, title: "豚肉とナスの甘酢炒め", ingredient: "豚肉, ナス", time: "15分", cost: "450円", ingredients: ["豚肉: 150g", "ナス: 2本", "甘酢だれ: 適量"], steps: ["具材を炒め、甘酢で味付ける"], tag: "豚肉" },
    { id: 24, title: "牛丼", ingredient: "牛肉, 玉ねぎ", time: "15分", cost: "550円", ingredients: ["牛薄切り肉: 200g", "玉ねぎ: 1/2個"], steps: ["甘辛い汁で玉ねぎと肉を煮込む"], tag: "牛肉" },
    { id: 25, title: "棒棒鶏", ingredient: "鶏むね肉", time: "15分", cost: "300円", ingredients: ["鶏むね肉: 1枚", "きゅうり: 1本", "ごまダレ: 適量"], steps: ["鶏肉を茹でて裂く", "きゅうりに乗せタレをかける"], tag: "鶏肉" },
    { id: 26, title: "ナスの肉巻き甘辛炒め", ingredient: "豚肉, ナス", time: "20分", cost: "400円", ingredients: ["ナス: 2本", "豚バラ薄切り: 8枚"], steps: ["ナスを肉で巻く", "フライパンで焼き、甘辛く味付け"], tag: "豚肉" },
    { id: 27, title: "タンドリーチキン", ingredient: "鶏肉", time: "30分", cost: "500円", ingredients: ["鶏もも肉: 1枚", "カレー粉・ヨーグルト: 各適量"], steps: ["肉をタレに漬け込む", "グリルで香ばしく焼く"], tag: "鶏肉" },
    { id: 28, title: "鶏むね肉のから揚げ", ingredient: "鶏むね肉", time: "25分", cost: "350円", ingredients: ["鶏むね肉: 1枚", "片栗粉・醤油: 各適量"], steps: ["そぎ切りにして揚げる"], tag: "鶏肉" },
    { id: 29, title: "トマト煮込みハンバーグ", ingredient: "挽肉, トマト", time: "35分", cost: "600円", ingredients: ["ハンバーグの種", "トマトソース: 1カップ"], steps: ["ハンバーグを焼きトマトソースで煮込む"], tag: "挽肉" },
    { id: 30, title: "赤から鍋", ingredient: "肉, 野菜", time: "25分", cost: "800円", ingredients: ["豚バラ・白菜・ニラ", "赤からスープの素"], steps: ["スープで具材を煮込む"], tag: "鍋" },
    { id: 31, title: "マグロアボカド丼", ingredient: "マグロ, アボカド", time: "10分", cost: "700円", ingredients: ["マグロ: 100g", "アボカド: 1/2個"], steps: ["角切りにして和える"], tag: "魚" },
    { id: 32, title: "サーモンアボカド丼", ingredient: "サーモン, アボカド", time: "10分", cost: "700円", ingredients: ["サーモン: 100g", "アボカド: 1/2個"], steps: ["醤油とわさびで和える"], tag: "魚" },
    { id: 33, title: "チーズタッカルビ", ingredient: "鶏肉, チーズ", time: "25分", cost: "650円", ingredients: ["鶏もも肉: 1枚", "キャベツ", "チーズ"], steps: ["肉と野菜を炒めチーズを溶かす"], tag: "鶏肉" },
    { id: 34, title: "豚ロースの水菜巻き", ingredient: "豚肉, 水菜", time: "15分", cost: "450円", ingredients: ["豚ロース: 8枚", "水菜: 1/2束"], steps: ["肉で水菜を巻き、レンジで加熱"], tag: "豚肉" },
    { id: 35, title: "油淋鶏", ingredient: "鶏肉", time: "25分", cost: "500円", ingredients: ["鶏もも肉: 1枚", "長ねぎ", "醤油・酢"], steps: ["肉を揚げて特製ねぎダレをかける"], tag: "鶏肉" },
    { id: 36, title: "野菜炒め", ingredient: "豚肉, ニンジン, ピーマン", time: "10分", cost: "350円", ingredients: ["豚肉: 100g", "人参・ピーマン"], steps: ["野菜を細切りにして強火で炒める"], tag: "豚肉" },
    { id: 37, title: "豚ローストンテキ", ingredient: "豚肉, キノコ", time: "20分", cost: "550円", ingredients: ["豚ロース: 1枚", "しめじ・エリンギ"], steps: ["豚肉を焼き、キノコを添える"], tag: "豚肉" },
    { id: 38, title: "鰆", ingredient: "鰆", time: "15分", cost: "600円", ingredients: ["鰆の切り身: 2枚", "塩・酒"], steps: ["西京焼き、または塩焼きにする"], tag: "魚" },
    { id: 39, title: "ベーコンとピーマン炒め", ingredient: "ベーコン, ピーマン", time: "5分", cost: "250円", ingredients: ["ベーコン: 3枚", "ピーマン: 3個"], steps: ["細切りにして炒める"], tag: "野菜" },
    { id: 40, title: "鶏チキンステーキ", ingredient: "鶏もも肉", time: "15分", cost: "400円", ingredients: ["鶏もも肉: 1枚", "にんにく醤油"], steps: ["皮目をパリッと焼く"], tag: "鶏肉" },
    { id: 41, title: "サムギョプサル", ingredient: "豚肉", time: "20分", cost: "800円", ingredients: ["豚バラ肉厚切り", "サンチュ・キムチ"], steps: ["肉を焼き、野菜で巻いて食べる"], tag: "豚肉" },
    { id: 42, title: "豚の角煮", ingredient: "豚肉", time: "60分", cost: "900円", ingredients: ["豚バラブロック: 400g"], steps: ["下茹でして甘辛く煮込む"], tag: "豚肉" },
    { id: 43, title: "豚の生姜焼き", ingredient: "豚肉", time: "15分", cost: "450円", ingredients: ["豚ロース: 200g", "生姜"], steps: ["生姜ダレで焼き上げる"], tag: "豚肉" },
    { id: 44, title: "肉そぼろ甘辛炒め", ingredient: "挽肉", time: "10分", cost: "300円", ingredients: ["合い挽き肉: 200g", "醤油・砂糖"], steps: ["ポロポロになるまで炒め煮にする"], tag: "挽肉" },
    { id: 45, title: "鶏肉とブロッコリーのクリーム煮", ingredient: "鶏肉, ブロッコリー", time: "20分", cost: "500円", ingredients: ["鶏もも肉: 1枚", "ブロッコリー: 1/2株"], steps: ["具材をホワイトソースで煮る"], tag: "鶏肉" },
    { id: 46, title: "春巻き", ingredient: "挽肉, 皮", time: "30分", cost: "450円", ingredients: ["春巻きの皮: 10枚", "具材"], steps: ["具を包んで色よく揚げる"], tag: "その他" },
    { id: 47, title: "カツオのたたき", ingredient: "カツオ", time: "5分", cost: "600円", ingredients: ["カツオのたたき: 1柵", "薬味"], steps: ["切って薬味を添える"], tag: "魚" }
  ];

  useEffect(() => {
    setRecipes(initialRecipes);
  }, []);

  const filteredRecipes = recipes.filter(r => {
    const searchLower = searchTerm.toLowerCase();
    return (
      r.title.toLowerCase().includes(searchLower) || 
      r.ingredient.toLowerCase().includes(searchLower) || 
      r.tag?.toLowerCase().includes(searchLower)
    );
  });

  const generateRecipeFromAI = async (dishName) => {
    const apiKey = "";
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `料理名「${dishName}」のレシピを教えてください。材料リスト（配列形式）と手順（配列形式）、目安費用、目安時間をJSON形式で出力してください。` }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                ingredients: { type: "ARRAY", items: { type: "STRING" } },
                steps: { type: "ARRAY", items: { type: "STRING" } },
                cost: { type: "STRING" },
                time: { type: "STRING" }
              }
            }
          }
        })
      });
      const data = await response.json();
      return JSON.parse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("AI Error:", error);
      return null;
    }
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const ingredient = formData.get('ingredient');
    setIsGenerating(true);
    const aiData = await generateRecipeFromAI(title);
    const newRecipe = {
      id: Date.now(),
      title,
      ingredient,
      time: aiData?.time || "15分",
      cost: aiData?.cost || "500円",
      ingredients: aiData?.ingredients || ["材料データなし"],
      steps: aiData?.steps || ["手順データなし"],
      tag: ingredient
    };
    setRecipes([newRecipe, ...recipes]);
    setIsGenerating(false);
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-orange-500/30">
      {/* Header - Mobile Style */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <ChefHat className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight leading-none text-white">REPERTOIRE</h1>
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Mobile Ready</span>
          </div>
        </div>
        <button 
          onClick={() => setIsAdding(true)} 
          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-transform"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </header>

      {/* Main Content - Padded for scrolling */}
      <main className="px-4 py-6 space-y-8 pb-32">
        {/* Search Bar - Larger for Thumb */}
        <section className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-slate-500 w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="料理名、食材名で検索"
            className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500/50 transition-all outline-none text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </section>

        {/* Categories - Horizontal Scroll for Mobile */}
        <section className="flex overflow-x-auto gap-2 no-scrollbar pb-2 -mx-4 px-4">
          {["すべて", "鶏肉", "豚肉", "挽肉", "牛肉", "魚", "野菜"].map(tag => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag === "すべて" ? "" : tag)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-xl font-bold text-sm border transition-all ${
                (searchTerm === tag || (tag === "すべて" && searchTerm === ""))
                ? 'bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/20' 
                : 'bg-slate-800 border-white/5 text-slate-400 active:bg-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </section>

        {/* Recipe Grid - 1 column for Mobile */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="h-1 w-1 rounded-full bg-orange-500" />
            <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
              RESULT: {filteredRecipes.length} ITEMS
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredRecipes.map(recipe => (
              <div
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className="group relative bg-slate-800/40 p-5 rounded-2xl border border-white/5 active:scale-[0.98] transition-all overflow-hidden flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest block mb-1">
                    {recipe.tag}
                  </span>
                  <h3 className="font-black text-white text-base truncate mb-2">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recipe.time}</span>
                    <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> {recipe.cost}</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                  <ChevronRight className="w-5 h-5 text-slate-500" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Action Button - Modern Mobile Feel */}
      {!isAdding && !selectedRecipe && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 sm:hidden">
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full shadow-2xl shadow-orange-500/40 active:scale-95 transition-all"
          >
            <Plus className="w-6 h-6" />
            <span className="font-black text-sm uppercase tracking-wider">New Recipe</span>
          </button>
        </div>
      )}

      {/* Recipe Detail Modal - Full Screen Mobile Overlay */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className="p-4 flex items-center gap-4 border-b border-white/5 bg-slate-900/50">
            <button onClick={() => setSelectedRecipe(null)} className="p-2 bg-white/5 rounded-xl">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <h2 className="flex-1 text-lg font-black truncate text-white">{selectedRecipe.title}</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="flex gap-4">
              <div className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Cook Time</p>
                <p className="text-lg font-black text-orange-500">{selectedRecipe.time}</p>
              </div>
              <div className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Est. Cost</p>
                <p className="text-lg font-black text-orange-500">{selectedRecipe.cost}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black text-white flex items-center gap-2 uppercase tracking-widest">
                <List className="w-4 h-4 text-orange-500" /> 材料
              </h4>
              <div className="space-y-2">
                {selectedRecipe.ingredients?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span className="text-sm font-bold text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pb-12">
              <h4 className="text-xs font-black text-white flex items-center gap-2 uppercase tracking-widest">
                <PlayCircle className="w-4 h-4 text-orange-500" /> 作り方
              </h4>
              <div className="space-y-4">
                {selectedRecipe.steps?.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-black text-xs">{i + 1}</div>
                    <p className="text-slate-400 text-sm font-bold leading-relaxed pt-1.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal - Full Screen Mobile Overlay */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className="p-4 flex items-center justify-between border-b border-white/5 bg-slate-900/50">
            <h2 className="text-lg font-black text-white">レシピを追加</h2>
            <button onClick={() => setIsAdding(false)} className="p-2 bg-white/5 rounded-xl">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="p-6 flex-1">
            <form onSubmit={handleAddRecipe} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Dish Name</label>
                <input required name="title" className="w-full px-5 py-4 bg-slate-800 border border-white/5 rounded-2xl text-white font-bold outline-none focus:ring-2 focus:ring-orange-500/50" placeholder="例：鶏肉のトマト煮込み" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Main Ingredient</label>
                <input required name="ingredient" className="w-full px-5 py-4 bg-slate-800 border border-white/5 rounded-2xl text-white font-bold outline-none focus:ring-2 focus:ring-orange-500/50" placeholder="例：鶏もも肉、ナス" />
              </div>
              <button 
                disabled={isGenerating} 
                type="submit" 
                className="w-full py-5 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-orange-500/20 active:scale-95 transition-transform mt-8"
              >
                {isGenerating ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                {isGenerating ? "AI GENERATING..." : "AI RECIPE GENERATE"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Custom Styles for no-scrollbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default App;
