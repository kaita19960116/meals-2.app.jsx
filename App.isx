import React, { useState, useEffect } from 'react';
import { Search, Plus, Utensils, ChefHat, Clock, CreditCard, X, ChevronRight, BookOpen, List, PlayCircle, Sparkles, Loader2, ChevronLeft, Edit2, Trash2, Save, RefreshCw } from 'lucide-react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [recipes, setRecipes] = useState([]);
  
  // 編集用のテンポラリ状態
  const [editForm, setEditForm] = useState(null);

  // 初期データ（LocalStorageから読み込み、なければ初期値をセット）
  useEffect(() => {
    const saved = localStorage.getItem('my-recipes');
    if (saved) {
      setRecipes(JSON.parse(saved));
    } else {
      const initialRecipes = [
        { id: 1, title: "鶏肉カレー", ingredient: "鶏もも肉", time: "30分", cost: "500円", ingredients: ["鶏もも肉: 250g", "玉ねぎ: 1個", "カレールー: 2皿分"], steps: ["具材を切る", "炒めて煮込む", "ルーを溶かす"], tag: "鶏肉" },
        { id: 2, title: "豚キムチ", ingredient: "豚肉, キムチ", time: "10分", cost: "400円", ingredients: ["豚バラ肉: 150g", "キムチ: 100g", "ニラ: 1/2束"], steps: ["豚肉を炒める", "キムチを加えて炒める"], tag: "豚肉" }
      ];
      setRecipes(initialRecipes);
    }
  }, []);

  // レシピが更新されるたびに保存
  useEffect(() => {
    if (recipes.length > 0) {
      localStorage.setItem('my-recipes', JSON.stringify(recipes));
    }
  }, [recipes]);

  const filteredRecipes = recipes.filter(r => {
    const searchLower = searchTerm.toLowerCase();
    return (
      r.title.toLowerCase().includes(searchLower) || 
      r.ingredient.toLowerCase().includes(searchLower) || 
      (r.tag && r.tag.toLowerCase().includes(searchLower))
    );
  });

  const generateRecipeFromAI = async (dishName) => {
    const apiKey = ""; // APIキーは環境変数等で管理するのが理想
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
        steps: aiData.steps || editForm.steps
      });
    }
    setIsRegenerating(false);
  };

  const deleteRecipe = (id) => {
    if (window.confirm("このレシピを削除してもよろしいですか？")) {
      setRecipes(recipes.filter(r => r.id !== id));
      setSelectedRecipe(null);
    }
  };

  const startEditing = () => {
    setEditForm({...selectedRecipe});
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setRecipes(recipes.map(r => r.id === editForm.id ? editForm : r));
    setSelectedRecipe(editForm);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <ChefHat className="text-white w-6 h-6" />
          </div>
          <h1 className="text-base sm:text-lg font-black tracking-tight text-white whitespace-nowrap overflow-hidden text-ellipsis">
            今日の晩ごはん <span className="text-orange-500">何にしよう？</span>
          </h1>
        </div>
        <button onClick={() => setIsAdding(true)} className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-transform ml-2">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </header>

      <main className="px-4 py-6 space-y-6 pb-32">
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

        <div className="grid grid-cols-1 gap-3">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} onClick={() => setSelectedRecipe(recipe)} className="bg-slate-800/40 p-5 rounded-2xl border border-white/5 active:scale-[0.98] transition-all flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{recipe.tag}</span>
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

      {/* 詳細・編集モーダル */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col">
          <div className="p-4 flex items-center gap-4 border-b border-white/5 bg-slate-900/50">
            <button onClick={() => {setSelectedRecipe(null); setIsEditing(false);}} className="p-2 bg-white/5 rounded-xl">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <h2 className="flex-1 text-lg font-black truncate text-white">
              {isEditing ? "レシピを編集" : selectedRecipe.title}
            </h2>
            {!isEditing && (
              <div className="flex gap-2">
                <button onClick={() => deleteRecipe(selectedRecipe.id)} className="p-2 text-red-400 bg-red-400/10 rounded-xl"><Trash2 className="w-5 h-5" /></button>
                <button onClick={startEditing} className="p-2 text-blue-400 bg-blue-400/10 rounded-xl"><Edit2 className="w-5 h-5" /></button>
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isEditing ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black text-slate-500 uppercase">タイトル</label>
                    <button 
                      onClick={handleRegenerateInEdit}
                      disabled={isRegenerating}
                      className="flex items-center gap-1 text-[10px] font-black text-orange-500 uppercase bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20 active:scale-95 transition-transform disabled:opacity-50"
                    >
                      {isRegenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                      AIで再生成
                    </button>
                  </div>
                  <input className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white font-bold" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase">時間</label>
                    <input className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white" value={editForm.time} onChange={e => setEditForm({...editForm, time: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase">費用</label>
                    <input className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white" value={editForm.cost} onChange={e => setEditForm({...editForm, cost: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase">材料 (1行ずつ入力)</label>
                  <textarea rows={5} className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white text-sm" value={editForm.ingredients.join('\n')} onChange={e => setEditForm({...editForm, ingredients: e.target.value.split('\n')})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase">手順 (1行ずつ入力)</label>
                  <textarea rows={5} className="w-full p-4 bg-slate-800 border border-white/10 rounded-xl text-white text-sm" value={editForm.steps.join('\n')} onChange={e => setEditForm({...editForm, steps: e.target.value.split('\n')})} />
                </div>
                <button onClick={handleSaveEdit} className="w-full py-5 bg-orange-500 text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"><Save className="w-5 h-5" /> 保存する</button>
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
                  <h4 className="text-xs font-black flex items-center gap-2 uppercase tracking-widest text-white"><PlayCircle className="w-4 h-4 text-orange-500" /> 手順</h4>
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

      {/* 新規追加モーダル */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col">
          <div className="p-4 flex items-center justify-between border-b border-white/5 bg-slate-900/50">
            <h2 className="text-lg font-black text-white">レシピを追加</h2>
            <button onClick={() => setIsAdding(false)} className="p-2 bg-white/5 rounded-xl"><X className="w-6 h-6 text-white" /></button>
          </div>
          <div className="p-6">
            <form onSubmit={handleAddRecipe} className="space-y-6">
              <input required name="title" className="w-full px-5 py-4 bg-slate-800 border border-white/5 rounded-2xl text-white font-bold" placeholder="料理名（例：ハンバーグ）" />
              <input required name="ingredient" className="w-full px-5 py-4 bg-slate-800 border border-white/5 rounded-2xl text-white font-bold" placeholder="主な食材（例：挽肉）" />
              <button disabled={isGenerating} type="submit" className="w-full py-5 bg-orange-500 text-white rounded-2xl font-black flex items-center justify-center gap-3">
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
