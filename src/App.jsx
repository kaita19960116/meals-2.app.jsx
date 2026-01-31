import React, { useState, useEffect } from 'react';
import { Search, Plus, Utensils, ChefHat, Clock, CreditCard, X, ChevronRight, BookOpen, List, PlayCircle, Sparkles, Loader2, ChevronLeft, Edit2, Trash2, Save, RefreshCw, Filter } from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [editForm, setEditForm] = useState(null);

  const quickFilters = ["すべて", "鶏もも", "鶏むね", "豚ロース", "豚こま切れ", "豚バラ", "挽肉", "牛肉", "魚介", "副菜"];

  const standardizeIngredient = (text) => {
    if (!text) return "その他";
    let standard = text;
    if (text.includes("挽肉") || text.includes("ひき肉") || text.includes("合挽き")) standard = "挽肉";
    else if (text.includes("鶏肉") || text.includes("鶏モモ") || text.includes("鶏もも肉")) standard = "鶏もも";
    else if (text.includes("鶏むね肉") || text.includes("鶏ムネ")) standard = "鶏むね";
    else if (text.includes("豚ロース肉") || text.includes("トンテキ")) standard = "豚ロース";
    else if (text.includes("豚バラ肉") || text.includes("豚バラ")) standard = "豚バラ";
    else if (text.includes("豚肉") || text.includes("豚こま")) standard = "豚こま切れ";
    else if (text.includes("牛") || text.includes("ビーフ")) standard = "牛肉";
    else if (text.includes("マグロ") || text.includes("サーモン") || text.includes("鰆") || text.includes("カツオ") || text.includes("ぶり") || text.includes("鮭") || text.includes("魚")) standard = "魚介";
    else if (text.includes("浸し") || text.includes("蒸し") || text.includes("ピーマン炒め") || text.includes("野菜")) standard = "副菜";
    return standard;
  };

  const initialFullMenu = [
    { title: "マグロアボカド丼", ingredient: "マグロ, アボカド", tag: "魚介" },
    { title: "サーモンアボカド丼", ingredient: "サーモン, アボカド", tag: "魚介" },
    { title: "チーズタッカルビ", ingredient: "鶏もも, チーズ", tag: "鶏もも" },
    { title: "豚ロースの水菜巻き", ingredient: "豚ロース, 水菜", tag: "豚ロース" },
    { title: "油淋鶏", ingredient: "鶏もも, 長ねぎ", tag: "鶏もも" },
    { title: "野菜炒め", ingredient: "豚こま切れ, ニンジン, ピーマン", tag: "豚こま切れ" },
    { title: "豚ローストンテキ", ingredient: "豚ロース, きのこ", tag: "豚ロース" },
    { title: "鰆の塩焼き", ingredient: "鰆", tag: "魚介" },
    { title: "ベーコンとピーマン炒め", ingredient: "ベーコン, ピーマン", tag: "副菜" },
    { title: "鶏チキンステーキ", ingredient: "鶏もも", tag: "鶏もも" },
    { title: "サムギョプサル", ingredient: "豚バラ", tag: "豚バラ" },
    { title: "豚の角煮", ingredient: "豚バラ", tag: "豚バラ" },
    { title: "豚の生姜焼き", ingredient: "豚こま切れ, 玉ねぎ", tag: "豚こま切れ" },
    { title: "肉そぼろ甘辛炒め", ingredient: "挽肉", tag: "挽肉" },
    { title: "鶏肉とブロッコリーのクリーム煮", ingredient: "鶏もも, ブロッコリー", tag: "鶏もも" },
    { title: "春巻き", ingredient: "豚こま切れ, 春雨", tag: "豚こま切れ" },
    { title: "カツオのたたき", ingredient: "カツオ", tag: "魚介" },
    { title: "鶏肉カレー", ingredient: "鶏もも, 野菜", tag: "鶏もも" },
    { title: "豚キムチ", ingredient: "豚バラ, キムチ", tag: "豚バラ" },
    { title: "チキントマト煮込み", ingredient: "鶏もも, トマト", tag: "鶏もも" },
    { title: "スペアリブ", ingredient: "豚バラ", tag: "豚バラ" },
    { title: "豚肉とナスの甘辛炒め", ingredient: "豚こま切れ, ナス", tag: "豚こま切れ" },
    { title: "鶏肉の甘辛煮", ingredient: "鶏もも", tag: "鶏もも" },
    { title: "牛肉の甘辛煮", ingredient: "牛肉", tag: "牛肉" },
    { title: "鶏肉白菜クリーム煮", ingredient: "鶏もも, 白菜", tag: "鶏もも" },
    { title: "ハンバーグ", ingredient: "挽肉, 玉ねぎ", tag: "挽肉" },
    { title: "鶏のから揚げ", ingredient: "鶏もも", tag: "鶏もも" },
    { title: "ぶり大根", ingredient: "ぶり, 大根", tag: "魚介" },
    { title: "鮭のムニエル", ingredient: "鮭", tag: "魚介" },
    { title: "回鍋肉", ingredient: "豚バラ, キャベツ", tag: "豚バラ" },
    { title: "親子丼", ingredient: "鶏もも, 卵", tag: "鶏もも" },
    { title: "豚もやし（レンジ）", ingredient: "豚バラ, もやし", tag: "豚バラ" },
    { title: "小松菜のお浸し", ingredient: "小松菜", tag: "副菜" },
    { title: "菊菜のお浸し", ingredient: "菊菜", tag: "副菜" },
    { title: "カオマンガイ", ingredient: "鶏もも, 米", tag: "鶏もも" },
    { title: "鶏モモコチュジャン炒め", ingredient: "鶏もも", tag: "鶏もも" },
    { title: "麻婆豆腐", ingredient: "豆腐, 挽肉", tag: "挽肉" },
    { title: "冷凍餃子", ingredient: "餃子", tag: "時短" },
    { title: "肉みそキャベツ", ingredient: "キャベツ, 挽肉", tag: "挽肉" },
    { title: "豚肉とナスの甘酢炒め", ingredient: "豚こま切れ, ナス", tag: "豚こま切れ" },
    { title: "牛丼", ingredient: "牛肉, 玉ねぎ", tag: "牛肉" },
    { title: "棒棒鶏", ingredient: "鶏むね, きゅうり", tag: "鶏むね" },
    { title: "ナスの肉巻き甘辛炒め", ingredient: "豚こま切れ, ナス", tag: "豚こま切れ" },
    { title: "タンドリーチキン", ingredient: "鶏もも", tag: "鶏もも" },
    { title: "鶏むね肉のから揚げ", ingredient: "鶏むね", tag: "鶏むね" },
    { title: "トマト煮込みハンバーグ", ingredient: "挽肉, トマト", tag: "挽肉" },
    { title: "赤から鍋", ingredient: "豚バラ, 白菜", tag: "豚バラ" },
    { title: "野菜の蒸し焼き", ingredient: "季節の野菜", tag: "副菜" },
    { title: "豚ロース肉のナス巻き", ingredient: "豚ロース, ナス", tag: "豚ロース" },
    { title: "豚肩ロースステーキ", ingredient: "豚ロース", tag: "豚ロース" }
  ].map((item, idx) => ({
    id: idx + 1,
    ...item,
    time: "20分",
    cost: "500円",
    ingredients: [`${item.ingredient}: 適量`],
    steps: ["下準備をする", "火を通す", "味付けをして完成"],
  }));

  useEffect(() => {
    const saved = localStorage.getItem('my-recipes-v8');
    if (saved) {
      setRecipes(JSON.parse(saved));
    } else {
      setRecipes(initialFullMenu);
    }
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      localStorage.setItem('my-recipes-v8', JSON.stringify(recipes));
    }
  }, [recipes]);

  const generateRecipeFromAI = async (dishName) => {
    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    const userPrompt = `料理名「${dishName}」のレシピを作成してください。料理サイトの構成を参考に、材料と手順を詳細に出力してください。
    【JSON構造】
    - ingredients: string[] (材料と分量)
    - steps: string[] (調理工程)
    - cost: string (目安費用)
    - time: string (目安時間)
    - mainCategory: string (鶏もも, 鶏むね, 豚ロース, 豚こま切れ, 豚バラ, 挽肉, 牛肉, 魚介, 副菜 から選択)`;

    const payload = {
      contents: [{ parts: [{ text: userPrompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            ingredients: { type: "ARRAY", items: { type: "STRING" } },
            steps: { type: "ARRAY", items: { type: "STRING" } },
            cost: { type: "STRING" },
            time: { type: "STRING" },
            mainCategory: { type: "STRING" }
          },
          required: ["ingredients", "steps", "cost", "time", "mainCategory"]
        }
      }
    };

    const fetchWithRetry = async (retries = 5, delay = 1000) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return text ? JSON.parse(text) : null;
      } catch (error) {
        if (retries > 0) {
          await new Promise(res => setTimeout(res, delay));
          return fetchWithRetry(retries - 1, delay * 2);
        }
        return null;
      }
    };

    return await fetchWithRetry();
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const inputIngredient = formData.get('ingredient');
    
    setIsGenerating(true);
    const aiData = await generateRecipeFromAI(title);
    
    const category = aiData?.mainCategory || inputIngredient;
    const standardTag = standardizeIngredient(category);
    
    const newRecipe = {
      id: Date.now(),
      title,
      ingredient: standardTag,
      time: aiData?.time || "20分",
      cost: aiData?.cost || "500円",
      ingredients: aiData?.ingredients || [`${inputIngredient}: 適量`],
      steps: aiData?.steps || ["下準備をする", "調理する", "完成"],
      tag: standardTag
    };

    setRecipes([newRecipe, ...recipes]);
    setIsGenerating(false);
    setIsAdding(false);
  };

  const handleRegenerateInEdit = async () => {
    if (!editForm.title) return;
    setIsRegenerating(true);
    const aiData = await generateRecipeFromAI(editForm.title);
    if (aiData) {
      setEditForm({
        ...editForm,
        time: aiData.time || editForm.time,
        cost: aiData.cost || editForm.cost,
        ingredients: aiData.ingredients || editForm.ingredients,
        steps: aiData.steps || editForm.steps,
        ingredient: aiData.mainCategory || editForm.ingredient
      });
    }
    setIsRegenerating(false);
  };

  const handleSaveEdit = () => {
    const updatedRecipe = {
      ...editForm,
      tag: standardizeIngredient(editForm.ingredient)
    };
    setRecipes(recipes.map(r => r.id === editForm.id ? updatedRecipe : r));
    setSelectedRecipe(updatedRecipe);
    setIsEditing(false);
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
          <h1 className="text-xl font-black tracking-widest text-white uppercase italic">REPERTOIRE</h1>
        </div>
        <button onClick={() => setIsAdding(true)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-transform">
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
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} onClick={() => setSelectedRecipe(recipe)} className="bg-slate-800/40 p-5 rounded-2xl border border-white/5 active:scale-[0.98] transition-all flex items-center gap-4 cursor-pointer">
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
          ))}
        </div>
      </main>

      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col">
          <div className="p-4 flex items-center gap-4 border-b border-white/5 bg-slate-900/50">
            <button onClick={() => {setSelectedRecipe(null); setIsEditing(false);}} className="p-2 bg-white/5 rounded-xl"><ChevronLeft className="w-6 h-6 text-white" /></button>
            <h2 className="flex-1 text-lg font-black truncate text-white">{isEditing ? "編集" : selectedRecipe.title}</h2>
            {!isEditing && (
              <div className="flex gap-2">
                <button onClick={() => { if(window.confirm("削除しますか？")) { setRecipes(recipes.filter(r => r.id !== selectedRecipe.id)); setSelectedRecipe(null); }}} className="p-2 text-red-400 bg-red-400/10 rounded-xl"><Trash2 className="w-5 h-5" /></button>
                <button onClick={() => {setEditForm({...selectedRecipe}); setIsEditing(true);}} className="p-2 text-blue-400 bg-blue-400/10 rounded-xl"><Edit2 className="w-5 h-5" /></button>
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isEditing ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black text-slate-500 uppercase">料理名</label>
                    <button onClick={handleRegenerateInEdit} disabled={isRegenerating} className="flex items-center gap-1 text-[10px] font-black text-orange-400 uppercase bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20 disabled:opacity-50">
                      {isRegenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                      AIでレシピを取得
                    </button>
                  </div>
                  <input className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white font-bold" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase">食材分類</label>
                  <input className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white font-bold" value={editForm.ingredient} onChange={e => setEditForm({...editForm, ingredient: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase">材料 (1行ずつ)</label>
                  <textarea rows={5} className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white text-sm" value={editForm.ingredients.join('\n')} onChange={e => setEditForm({...editForm, ingredients: e.target.value.split('\n')})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase">手順 (1行ずつ)</label>
                  <textarea rows={5} className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white text-sm" value={editForm.steps.join('\n')} onChange={e => setEditForm({...editForm, steps: e.target.value.split('\n')})} />
                </div>
                <button onClick={handleSaveEdit} className="w-full py-5 bg-orange-500 text-white rounded-2xl font-black flex items-center justify-center gap-2"><Save className="w-5 h-5" /> 保存</button>
              </div>
            ) : (
              <>
                <div className="flex gap-4">
                  <div className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Time</p>
                    <p className="text-lg font-black text-orange-500">{selectedRecipe.time}</p>
                  </div>
                  <div className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Cost</p>
                    <p className="text-lg font-black text-orange-500">{selectedRecipe.cost}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-black flex items-center gap-2 uppercase tracking-widest text-white"><List className="w-4 h-4 text-orange-500" /> 材料</h4>
                  <div className="space-y-2">
                    {selectedRecipe.ingredients?.map((item, i) => (
                      <div key={i} className="p-4 bg-slate-800/50 rounded-xl border border-white/5 text-sm font-bold text-slate-300">{item}</div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4 pb-12">
                  <h4 className="text-xs font-black flex items-center gap-2 uppercase tracking-widest text-white"><PlayCircle className="w-4 h-4 text-orange-500" /> 作り方</h4>
                  <div className="space-y-4">
                    {selectedRecipe.steps?.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-black text-xs">{i + 1}</div>
                        <p className="text-slate-400 text-sm font-bold pt-1">{step}</p>
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
        <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col">
          <div className="p-4 flex items-center justify-between border-b border-white/5 bg-slate-900/50">
            <h2 className="text-lg font-black text-white">新規レシピ</h2>
            <button onClick={() => setIsAdding(false)} className="p-2 bg-white/5 rounded-xl"><X className="w-6 h-6 text-white" /></button>
          </div>
          <div className="p-6">
            <form onSubmit={handleAddRecipe} className="space-y-6">
              <input required name="title" className="w-full px-5 py-4 bg-slate-800 border border-white/5 rounded-2xl text-white font-bold" placeholder="料理名" />
              <input required name="ingredient" className="w-full px-5 py-4 bg-slate-800 border border-white/5 rounded-2xl text-white font-bold" placeholder="食材のヒント" />
              <button disabled={isGenerating} type="submit" className="w-full py-5 bg-orange-500 text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg shadow-orange-500/20">
                {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles />}
                {isGenerating ? "AI生成中..." : "AIでレシピを作成"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
