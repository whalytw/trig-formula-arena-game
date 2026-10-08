/* Original formula-review questions based on the four supplied textbooks.
 * The first option is the answer here; app.js shuffles all four at runtime.
 * page is the printed textbook page, not the PDF viewer page.
 */
(() => {
 const R=String.raw, bank=[];
 const q=(unit,topic,prompt,formula,answer,wrong,explanation,page)=>bank.push({id:`u${unit}-${bank.filter(x=>x.unit===unit).length+1}`,unit,topic,prompt,formula,options:[answer,...wrong],correct:0,explanation,page});
 // Unit 1 — radians, sectors and the special-angle reference table.
 q(1,'弧度定義','弧長為 s、半徑為 r，圓心角的弧度量是？',R`r>0`,R`\theta=\frac{s}{r}`,[R`\theta=\frac{r}{s}`,R`\theta=sr`,R`\theta=\frac{s}{2r}`],'弧度量等於弧長除以半徑。',3);
 q(1,'弧長','扇形弧長 s 的公式是？',R`r>0`,R`s=r\theta`,[R`s=\frac{r\theta}{2}`,R`s=r^2\theta`,R`s=\frac{\theta}{r}`],'θ 必須以弳為單位；弧長 s＝rθ。',7);
 q(1,'扇形面積','扇形面積 A 的公式是？',R`0<\theta\le2\pi`,R`A=\frac{1}{2}r^2\theta`,[R`A=r^2\theta`,R`A=\frac{1}{2}r\theta`,R`A=\frac{1}{2}r\theta^2`],'半徑為 r、圓心角為 θ 弳時，A＝½r²θ。',7);
 q(1,'扇形面積','用半徑 r 與弧長 s 表示扇形面積。',R`r>0`,R`A=\frac{rs}{2}`,[R`A=rs`,R`A=\frac{r^2s}{2}`,R`A=\frac{s^2}{2}`],'由 s＝rθ 代入 A＝½r²θ，得到 A＝½rs。',7);
 q(1,'度轉弳','將 D 度換成弳，應使用哪個式子？','',R`\frac{D\pi}{180}`,[R`\frac{180D}{\pi}`,R`\frac{D\pi}{360}`,R`180D\pi`],'度數乘以 π／180，得到弧度量。',3);
 q(1,'弳轉度','將 θ 弳換成度數，應使用哪個式子？','',R`\frac{180\theta}{\pi}`,[R`\frac{\pi\theta}{180}`,R`\frac{360\theta}{\pi}`,R`180\pi\theta`],'弧度量乘以 180／π，得到度數。',3);
 q(1,'基本換算','半周角 180° 等於多少弳？','',R`\pi`,[R`2\pi`,R`\frac{\pi}{2}`,R`\frac{\pi}{180}`],'半周角為 π 弳，這也是換算公式的基準。',3);
 q(1,'基本換算','一個周角 360° 等於多少弳？','',R`2\pi`,[R`\pi`,R`\frac{\pi}{2}`,R`4\pi`],'繞圓一周是 2π 弳。',3);
 q(1,'同界角','與 θ 同界的角可表示成？',R`k\in\Z`,R`\theta+2k\pi`,[R`\theta+k\pi`,R`\theta+\frac{k\pi}{2}`,R`\theta+\frac{k}{\pi}`],'同界角相差 2π 的整數倍；注意與正切週期 π 的差別。',6);
 q(1,'一弳的定義','圓心角是 1 弳時，弧長與半徑的關係是？',R`\theta=1`,R`s=r`,[R`s=2r`,R`s=\pi r`,R`s=r^2`],'弧長等於半徑時，所對的圓心角定為 1 弳。',2);
 const angles=[['30',R`\frac{\pi}{6}`],['45',R`\frac{\pi}{4}`],['60',R`\frac{\pi}{3}`],['90',R`\frac{\pi}{2}`],['120',R`\frac{2\pi}{3}`],['270',R`\frac{3\pi}{2}`]];
 for(const [deg,rad] of angles) q(1,'特殊角換算',`${deg}° 對應的弧度量是？`,'',rad,angles.filter(x=>x[1]!==rad).slice(0,3).map(x=>x[1]),'以 180°＝π 弳作為基準，記住常用特殊角的對應。',5);
 // Unit 2 — properties and parameter formulas; no graph drawing or calculation.
 q(2,'正弦週期','正弦函數的最小正週期是？',R`y=\sin x`,R`2\pi`,[R`\pi`,R`\frac{\pi}{2}`,R`4\pi`],'sin x 的最小正週期為 2π；較大的整數倍不是最小正週期。',22);
 q(2,'餘弦週期','餘弦函數的最小正週期是？',R`y=\cos x`,R`2\pi`,[R`\pi`,R`\frac{\pi}{2}`,R`4\pi`],'cos x 與 sin x 都以 2π 為最小正週期。',35);
 q(2,'正切週期','正切函數的最小正週期是？',R`y=\tan x`,R`\pi`,[R`2\pi`,R`\frac{\pi}{2}`,R`4\pi`],'tan(x＋π)＝tan x，其最小正週期是 π。',41);
 for(const f of ['sin','cos']) {
  q(2,'值域',`${f} x 的值域是？`,'',R`-1\le y\le1`,[R`0\le y\le1`,R`-1<y<1`,R`y\in\R`],'正弦與餘弦的值介於 −1 與 1，並包含端點。',f==='sin'?22:35);
  q(2,'振幅',`y＝${f} x 的振幅是？`,'','1',['2',R`\pi`,R`2\pi`],'基本正弦與餘弦函數的振幅皆為 1。',f==='sin'?23:35);
 }
 q(2,'正切值域','正切函數的值域是？',R`y=\tan x`,R`y\in\R`,[R`-1\le y\le1`,R`y>0`,R`y\ne0`],'正切函數可以取到所有實數值。',41);
 q(2,'正切定義域','tan x 沒有定義的 x 是？',R`k\in\Z`,R`x=\frac{\pi}{2}+k\pi`,[R`x=k\pi`,R`x=2k\pi`,R`x=\frac{\pi}{4}+k\pi`],'cos x＝0 時，商數 sin x／cos x 沒有定義。',41);
 q(2,'正弦對稱','正弦的負角關係式是？','',R`\sin(-x)=-\sin x`,[R`\sin(-x)=\sin x`,R`\sin(-x)=\cos x`,R`\sin(-x)=-\cos x`],'sin 是奇函數，圖形對稱於原點。',23);
 q(2,'餘弦對稱','餘弦的負角關係式是？','',R`\cos(-x)=\cos x`,[R`\cos(-x)=-\cos x`,R`\cos(-x)=\sin x`,R`\cos(-x)=-\sin x`],'cos 是偶函數，圖形對稱於 y 軸。',35);
 q(2,'正切對稱','正切的負角關係式是？','',R`\tan(-x)=-\tan x`,[R`\tan(-x)=\tan x`,R`\tan(-x)=\sin x`,R`\tan(-x)=-\cos x`],'tan 是奇函數，圖形對稱於原點。',41);
 q(2,'正餘弦關係','cos x 可改寫成哪個正弦式？','',R`\sin(x+\frac{\pi}{2})`,[R`\sin(x-\frac{\pi}{2})`,R`\sin(x+\pi)`,R`\sin x`],'cos x＝sin(x＋π／2)，相當於 sin 圖形向左平移 π／2。',35);
 q(2,'週期公式','下列函數的最小正週期 T 是？',R`y=a\sin(bx+c)+d`,R`T=\frac{2\pi}{b}`,[R`T=2\pi b`,R`T=\frac{\pi}{b}`,R`T=\frac{2\pi}{a}`],'本題 a＞0、b＞0。週期只由 x 的係數 b 決定。',31);
 q(2,'振幅公式','下列函數的振幅是？',R`y=a\sin(bx+c)+d`,R`a`,[R`b`,R`c`,R`d`],'本題 a＞0、b＞0。振幅為 a，平移不改變振幅。',31);
 q(2,'最大值公式','下列函數的最大值是？',R`y=a\sin(bx+c)+d`,R`d+a`,[R`d-a`,R`a-d`,R`d+1`],'本題 a＞0、b＞0，x 為全體實數。最大值是中線 d 加振幅 a。',32);
 q(2,'最小值公式','下列函數的最小值是？',R`y=a\sin(bx+c)+d`,R`d-a`,[R`d+a`,R`a-d`,R`d-1`],'本題 a＞0、b＞0，x 為全體實數。最小值是中線 d 減振幅 a。',32);
 q(2,'水平平移','相較於 y＝sin x，圖形如何平移？',R`y=\sin(x-h),\quad0<h<\pi`,R`\text{向右 }h\text{ 單位}`,[R`\text{向左 }h\text{ 單位}`,R`\text{向上 }h\text{ 單位}`,R`\text{向下 }h\text{ 單位}`],'括號內減 h，表示向右平移 h。限定 0＜h＜π，使左右平移的選項不會因週期而重合。',25);
 q(2,'水平平移','相較於 y＝sin x，圖形如何平移？',R`y=\sin(x+h),\quad0<h<\pi`,R`\text{向左 }h\text{ 單位}`,[R`\text{向右 }h\text{ 單位}`,R`\text{向上 }h\text{ 單位}`,R`\text{向下 }h\text{ 單位}`],'括號內加 h，表示向左平移 h。限定 0＜h＜π，使左右平移的選項不會因週期而重合。',25);
 q(2,'垂直平移','相較於 y＝sin x，圖形如何平移？',R`y=\sin x+k,\quad k>0`,R`\text{向上 }k\text{ 單位}`,[R`\text{向下 }k\text{ 單位}`,R`\text{向右 }k\text{ 單位}`,R`\text{向左 }k\text{ 單位}`],'函數值增加 k，圖形向上平移 k。',25);
 q(2,'水平伸縮','相較於 y＝sin x，水平長度變為？',R`y=\sin bx,\quad b>0`,R`\frac{1}{b}\text{ 倍}`,[R`b\text{ 倍}`,R`b^2\text{ 倍}`,R`\frac{1}{b^2}\text{ 倍}`],'x 的係數 b 使水平長度成為原來的 1／b 倍。',29);
 q(2,'頻率','若週期為 T，頻率 f 的公式是？',R`T>0`,R`f=\frac{1}{T}`,[R`f=T`,R`f=2T`,R`f=\frac{T}{2}`],'當自變數為時間時，頻率是週期的倒數。',23);
 // Unit 3 — addition, subtraction, double/triple angles, half angles.
 const sa=R`\sin\alpha`,ca=R`\cos\alpha`,sb=R`\sin\beta`,cb=R`\cos\beta`,ta=R`\tan\alpha`,tb=R`\tan\beta`;
 q(3,'正弦和角','選出正確的展開式。',R`\sin(\alpha+\beta)=?`,`${sa}${cb}+${ca}${sb}`,[`${sa}${cb}-${ca}${sb}`,`${ca}${cb}-${sa}${sb}`,`${sa}+${sb}`],'正弦和角：sin α cos β＋cos α sin β。',50);
 q(3,'正弦差角','選出正確的展開式。',R`\sin(\alpha-\beta)=?`,`${sa}${cb}-${ca}${sb}`,[`${sa}${cb}+${ca}${sb}`,`${ca}${cb}+${sa}${sb}`,`${sa}-${sb}`],'正弦差角的展開式中間是減號。',50);
 q(3,'餘弦和角','選出正確的展開式。',R`\cos(\alpha+\beta)=?`,`${ca}${cb}-${sa}${sb}`,[`${ca}${cb}+${sa}${sb}`,`${sa}${cb}+${ca}${sb}`,`${ca}+${cb}`],'餘弦和角：cos α cos β−sin α sin β。',50);
 q(3,'餘弦差角','選出正確的展開式。',R`\cos(\alpha-\beta)=?`,`${ca}${cb}+${sa}${sb}`,[`${ca}${cb}-${sa}${sb}`,`${sa}${cb}-${ca}${sb}`,`${ca}-${cb}`],'餘弦差角的展開式中間是加號。',50);
 q(3,'正切和角','選出正確的展開式。',R`\tan(\alpha+\beta)=?`,R`\frac{\tan\alpha+\tan\beta}{1-\tan\alpha\tan\beta}`,[R`\frac{\tan\alpha+\tan\beta}{1+\tan\alpha\tan\beta}`,R`\frac{\tan\alpha-\tan\beta}{1-\tan\alpha\tan\beta}`,R`\tan\alpha+\tan\beta`],'tan α、tan β 及 tan(α＋β) 皆須有定義；分子加、分母減。',53);
 q(3,'正切差角','選出正確的展開式。',R`\tan(\alpha-\beta)=?`,R`\frac{\tan\alpha-\tan\beta}{1+\tan\alpha\tan\beta}`,[R`\frac{\tan\alpha-\tan\beta}{1-\tan\alpha\tan\beta}`,R`\frac{\tan\alpha+\tan\beta}{1+\tan\alpha\tan\beta}`,R`\tan\alpha-\tan\beta`],'tan α、tan β 及 tan(α−β) 皆須有定義；分子減、分母加。',53);
 const merge=[['正弦和角',`${sa}${cb}+${ca}${sb}`,R`\sin(\alpha+\beta)`],['正弦差角',`${sa}${cb}-${ca}${sb}`,R`\sin(\alpha-\beta)`],['餘弦和角',`${ca}${cb}-${sa}${sb}`,R`\cos(\alpha+\beta)`],['餘弦差角',`${ca}${cb}+${sa}${sb}`,R`\cos(\alpha-\beta)`]];
 for(const [topic,form,answer] of merge) q(3,`${topic}反向辨認`,'將下列式子合併成一個三角比。',form,answer,merge.filter(x=>x[2]!==answer).map(x=>x[2]),'先辨認 sin／cos 的搭配，再辨認中間的正負號。',50);
 q(3,'正弦二倍角','選出正確的二倍角公式。',R`\sin2\theta=?`,R`2\sin\theta\cos\theta`,[R`\sin^2\theta+\cos^2\theta`,R`\sin^2\theta-\cos^2\theta`,R`2\sin\theta`],'sin 2θ＝2 sin θ cos θ。',56);
 q(3,'餘弦二倍角','選出正確的二倍角公式。',R`\cos2\theta=?`,R`\cos^2\theta-\sin^2\theta`,[R`\cos^2\theta+\sin^2\theta`,R`\sin^2\theta-\cos^2\theta`,R`2\cos\theta`],'cos 2θ＝cos²θ−sin²θ。',56);
 q(3,'餘弦二倍角','只用 sin θ 表示 cos 2θ。','',R`1-2\sin^2\theta`,[R`2\sin^2\theta-1`,R`1-\sin^2\theta`,R`2\sin\theta-1`],'cos 2θ＝1−2 sin²θ。',56);
 q(3,'餘弦二倍角','只用 cos θ 表示 cos 2θ。','',R`2\cos^2\theta-1`,[R`1-2\cos^2\theta`,R`2\cos\theta-1`,R`\cos^2\theta-1`],'cos 2θ＝2 cos²θ−1。',56);
 q(3,'正切二倍角','選出正確的二倍角公式。',R`\tan2\theta=?`,R`\frac{2\tan\theta}{1-\tan^2\theta}`,[R`\frac{2\tan\theta}{1+\tan^2\theta}`,R`\frac{\tan^2\theta}{1-2\tan\theta}`,R`2\tan\theta`],'tan θ 有定義且 tan²θ≠1 時成立。',56);
 q(3,'正弦三倍角','選出正確的三倍角公式。',R`\sin3\theta=?`,R`3\sin\theta-4\sin^3\theta`,[R`4\sin^3\theta-3\sin\theta`,R`3\sin\theta+4\sin^3\theta`,R`3\sin\theta`],'sin 3θ＝3 sin θ−4 sin³θ。',59);
 q(3,'餘弦三倍角','選出正確的三倍角公式。',R`\cos3\theta=?`,R`4\cos^3\theta-3\cos\theta`,[R`3\cos\theta-4\cos^3\theta`,R`4\cos^3\theta+3\cos\theta`,R`3\cos\theta`],'cos 3θ＝4 cos³θ−3 cos θ。',60);
 q(3,'正弦半角','選出正確的半角公式。',R`\sin\frac{\theta}{2}=?`,R`\pm\sqrt{\frac{1-\cos\theta}{2}}`,[R`\pm\sqrt{\frac{1+\cos\theta}{2}}`,R`\pm\sqrt{1-\cos\theta}`,R`\frac{\sin\theta}{2}`],'sin 半角根號內用 1−cos θ，正負號由 θ／2 的象限決定。',60);
 q(3,'餘弦半角','選出正確的半角公式。',R`\cos\frac{\theta}{2}=?`,R`\pm\sqrt{\frac{1+\cos\theta}{2}}`,[R`\pm\sqrt{\frac{1-\cos\theta}{2}}`,R`\pm\sqrt{1+\cos\theta}`,R`\frac{\cos\theta}{2}`],'cos 半角根號內用 1＋cos θ，正負號由 θ／2 的象限決定。',60);
 q(3,'半角正負號','半角公式的正負號應由哪個角決定？','',R`\frac{\theta}{2}\text{ 所在的象限}`,[R`\theta\text{ 所在的象限}`,R`2\theta\text{ 所在的象限}`,R`\text{一律取正號}`],'判斷的是 θ／2 的象限，不能直接使用 θ 的象限。',60);
 q(3,'正弦半角平方','選出正確的半角平方關係式。',R`\sin^2(\frac{\theta}{2})=?`,R`\frac{1-\cos\theta}{2}`,[R`\frac{1+\cos\theta}{2}`,R`1-\cos\theta`,R`\frac{\sin^2\theta}{2}`],'半角平方關係不需要選正負號。',60);
 q(3,'餘弦半角平方','選出正確的半角平方關係式。',R`\cos^2(\frac{\theta}{2})=?`,R`\frac{1+\cos\theta}{2}`,[R`\frac{1-\cos\theta}{2}`,R`1+\cos\theta`,R`\frac{\cos^2\theta}{2}`],'cos 半角平方等於 (1＋cos θ)／2。',60);
 q(3,'商數關係','正切的商數關係式是？',R`\cos\theta\ne0`,R`\tan\theta=\frac{\sin\theta}{\cos\theta}`,[R`\tan\theta=\frac{\cos\theta}{\sin\theta}`,R`\tan\theta=\sin\theta\cos\theta`,R`\tan\theta=\sin\theta+\cos\theta`],'正切等於正弦除以餘弦；分母不可為零。',53);
 q(3,'平方關係','三角比的平方關係式是？','',R`\sin^2\theta+\cos^2\theta=1`,[R`\sin^2\theta-\cos^2\theta=1`,R`\sin\theta+\cos\theta=1`,R`\sin^2\theta+\cos^2\theta=2`],'sin²θ＋cos²θ＝1，用來轉換餘弦二倍角的形式。',56);
 q(3,'平方展開','選出正確的恆等式。',R`(\sin\theta+\cos\theta)^2=?`,R`1+\sin2\theta`,[R`1-\sin2\theta`,R`\sin2\theta`,R`1+\cos2\theta`],'平方後交叉項是 2 sin θ cos θ＝sin 2θ。',58);
 q(3,'平方展開','選出正確的恆等式。',R`(\sin\theta-\cos\theta)^2=?`,R`1-\sin2\theta`,[R`1+\sin2\theta`,R`1-\cos2\theta`,R`-\sin2\theta`],'平方後交叉項為 −2 sin θ cos θ＝−sin 2θ。',58);
 q(3,'直線夾角','兩非鉛直線斜率為 m₁、m₂，較小夾角 φ 滿足？',R`1+m_1m_2\ne0`,R`\tan\varphi=|\frac{m_1-m_2}{1+m_1m_2}|`,[R`\tan\varphi=|\frac{m_1+m_2}{1-m_1m_2}|`,R`\tan\varphi=|m_1-m_2|`,R`\tan\varphi=|\frac{m_1-m_2}{1-m_1m_2}|`],'由正切差角公式推得。較小夾角介於 0° 與 90°；垂直時分母為零。',55);
 q(3,'圓角公式','圓角半徑 r、原內角 θ，圓心到頂點的距離 d 是？',R`0<\theta<\pi`,R`d=\frac{r}{\sin(\frac{\theta}{2})}`,[R`d=\frac{r}{\cos(\frac{\theta}{2})}`,R`d=r\sin(\frac{\theta}{2})`,R`d=\frac{r}{\sin\theta}`],'圓心在角平分線上，由直角三角形得 d＝r／sin(θ／2)。',65);
 // Unit 4 — generic identities. No restricted-interval extrema by rote.
 q(4,'疊合振幅','疊合成 R sin(x＋θ) 時，R 是？',R`a\sin x+b\cos x`,R`R=\sqrt{a^2+b^2}`,[R`R=a+b`,R`R=|a-b|`,R`R=\sqrt{a^2-b^2}`],'a、b 不全為零，取 R＞0。振幅是 √(a²＋b²)。',72);
 q(4,'疊合形式','相同週期的正餘弦疊合後可寫成？',R`a\sin x+b\cos x`,R`R\sin(x+\theta)`,[R`R\sin x+\theta`,R`R\sin(\theta x)`,R`R\sin x\cos x`],'相同週期的正餘弦疊合，仍是同週期的正弦函數，R＞0。',72);
 q(4,'相位條件','疊合相位 θ 的 cos 值應滿足？',R`a\sin x+b\cos x=R\sin(x+\theta)`,R`\cos\theta=\frac{a}{R}`,[R`\cos\theta=\frac{b}{R}`,R`\cos\theta=\frac{R}{a}`,R`\cos\theta=\frac{a}{b}`],'展開 R sin(x＋θ)，sin x 的係數為 R cos θ＝a。',72);
 q(4,'相位條件','疊合相位 θ 的 sin 值應滿足？',R`a\sin x+b\cos x=R\sin(x+\theta)`,R`\sin\theta=\frac{b}{R}`,[R`\sin\theta=\frac{a}{R}`,R`\sin\theta=\frac{R}{b}`,R`\sin\theta=\frac{b}{a}`],'展開 R sin(x＋θ)，cos x 的係數為 R sin θ＝b。',72);
 q(4,'最大值','x 為全體實數，函數最大值是？',R`y=a\sin x+b\cos x`,R`\sqrt{a^2+b^2}`,[R`a+b`,R`|a-b|`,R`a^2+b^2`],'a、b 不全為零；疊合後振幅為 √(a²＋b²)，此處沒有區間限制。',75);
 q(4,'最小值','x 為全體實數，函數最小值是？',R`y=a\sin x+b\cos x`,R`-\sqrt{a^2+b^2}`,[R`\sqrt{a^2+b^2}`,R`-a-b`,R`-|a-b|`],'疊合後的最小值是振幅的相反數。',75);
 q(4,'平移後最大值','x 為全體實數，函數最大值是？',R`y=a\sin x+b\cos x+c`,R`c+\sqrt{a^2+b^2}`,[R`c-\sqrt{a^2+b^2}`,R`a+b+c`,R`c+a^2+b^2`],'上移 c 後，最大值為 c＋振幅。',77);
 q(4,'平移後最小值','x 為全體實數，函數最小值是？',R`y=a\sin x+b\cos x+c`,R`c-\sqrt{a^2+b^2}`,[R`c+\sqrt{a^2+b^2}`,R`c-a-b`,R`c-a^2-b^2`],'上移 c 後，最小值為 c−振幅。',77);
 q(4,'疊合週期','a、b 不全為零，疊合函數的最小正週期是？',R`y=a\sin x+b\cos x`,R`2\pi`,[R`\pi`,R`\frac{\pi}{2}`,R`\sqrt{a^2+b^2}`],'疊合不改變這兩個基本函數的週期，仍為 2π。',71);
 q(4,'基本疊合','選出正確的疊合式。',R`\sin x+\cos x=?`,R`\sqrt2\sin(x+\frac{\pi}{4})`,[R`\sqrt2\sin(x-\frac{\pi}{4})`,R`2\sin(x+\frac{\pi}{4})`,R`\sin(x+\frac{\pi}{4})`],'振幅 √2，並向左平移 π／4。',71);
 q(4,'基本疊合','選出正確的疊合式。',R`\sin x-\cos x=?`,R`\sqrt2\sin(x-\frac{\pi}{4})`,[R`\sqrt2\sin(x+\frac{\pi}{4})`,R`2\sin(x-\frac{\pi}{4})`,R`\sin(x-\frac{\pi}{4})`],'振幅 √2，並向右平移 π／4。',74);
 q(4,'疊合展開','展開後 sin x 的係數是？',R`R\sin(x+\theta)`,R`R\cos\theta`,[R`R\sin\theta`,R`-R\cos\theta`,R`R`],'R sin(x＋θ)＝R cos θ sin x＋R sin θ cos x。',72);
 q(4,'疊合展開','展開後 cos x 的係數是？',R`R\sin(x+\theta)`,R`R\sin\theta`,[R`R\cos\theta`,R`-R\sin\theta`,R`R`],'cos x 的係數為 R sin θ。',72);
 q(4,'最大值條件','R＞0 時，下式何時取到最大值？',R`y=R\sin(x+\theta)+c`,R`\sin(x+\theta)=1`,[R`\sin(x+\theta)=0`,R`\sin(x+\theta)=-1`,R`\cos(x+\theta)=1`],'當正弦項為 1 時，y＝R＋c 為最大值。',77);
 q(4,'最小值條件','R＞0 時，下式何時取到最小值？',R`y=R\sin(x+\theta)+c`,R`\sin(x+\theta)=-1`,[R`\sin(x+\theta)=1`,R`\sin(x+\theta)=0`,R`\cos(x+\theta)=-1`],'當正弦項為 −1 時，y＝c−R 為最小值。',77);
 q(4,'有限區間','若 x 限制在一段區間，求最大最小值時應？','',R`\text{檢查區間內的波峰、波谷與端點}`,[R`\text{一律直接取正負振幅}`,R`\text{只檢查左端點}`,R`\text{只檢查右端點}`],'限制區間可能未包含波峰或波谷，不能一律套用全實數的極值。',77);
 for(const x of bank) {
  x.condition = x.unit===1 && ['弧長','扇形面積'].includes(x.topic) ? 'θ 以弳為單位' :
   x.unit===2 && ['週期公式','振幅公式','最大值公式','最小值公式'].includes(x.topic) ? 'a＞0、b＞0；x ∈ ℝ' :
   x.unit===3 && x.topic.startsWith('正切') ? '各正切值有定義，分母不為 0' :
   x.unit===4 && !['基本疊合','最大值條件','最小值條件','有限區間'].includes(x.topic) ? 'a、b 不全為 0；R＞0；x ∈ ℝ' : '';
  x.formula=x.formula.replace(/\\quad/g,'\\,');
 }
 window.QUESTION_BANK=bank;
 window.UNIT_NAMES=['','弧度量','三角函數的圖形','三角的和差角公式','正餘弦的疊合'];
})();
