"use client";

import React, { useState } from "react";

export default function Home() {
  const [n, setN] = useState<string>("");
  const [sets, setSets] = useState<string[][]>([]);
  const [result, setResult] = useState<string[]>([]);

  const handleSetElementsChange = (index: number, value: string) => {
    const newSets = [...sets];
    newSets[index] = value.split(/\s+/).map((el) => el.trim());
    setSets(newSets);
  };

  const handleNChange = (value: string) => {
    if (value === "") {
      setN("");
      setSets([]);
      return;
    }

    if (!/^\d+$/.test(value)) {
      alert("Va rog introduceti un numar fara spatiu.");
      return;
    }

    const numSets = parseInt(value);

    if (isNaN(numSets) || numSets <= 0) {
      alert("Va rog introduceti un numar pozitiv.");
      return;
    }

    setN(value);
    setSets(Array(numSets).fill([]));
  };

  const generateCartesianProduct = () => {
    if (n === "" || sets.some((set) => set.length === 0)) {
      alert("Va rog introduceti un set valid.");
      return;
    }

    let product: string[] = [""];
    
    // Generate the Cartesian product
    for (let i = 0; i < parseInt(n); i++) {
      const newProduct: string[] = [];

      sets[i].forEach((element) => {
        product.forEach((p) => {
          newProduct.push(`${p} ${element}`);
        });
      });

      product = newProduct;
    }

    setResult(product.map((item) => `(${item.trim()})`));
  };

  const cartesianAlgorithmCode = `
#include <iostream>

using namespace std;

int n, st[20], k, a[10], sol=0;

void afisare ()
{
    for (int i=1; i<=n; i++)
        cout<<st[i]<<" ";
    cout<<endl;
}

int succesor ()
{
    if (st[k]<a[k]) { st[k]++; 
                      return 1;
                    }
        else return 0;
}

int valid ()
{
    return 1;
}

void backtrack ()
{
    k=1;
    st[k]=0;
    while (k>0) {int as=1, ev=0;
                 while (as && !ev) {as=succesor();
                                    if (as) ev=valid();
                                   }
                  if (as) { if (k==n) { afisare();
                                        sol++;
                                      }
                                else {k++;
                                      st[k]=0;
                                     }
                          }
                      else k--;

                 }
}

int main()
{
    cout<<"introdu n: "; cin>>n;
    for (int i=1; i<=n; i++)
        {cout<<"introdu nr elem ale multimii "<<i<<": ";
         cin>>a[i];
        }
    backtrack();
    cout<<"\nnr de solutii este "<<sol;
    return 0;
}
`;

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100 font-sans py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-100">Produsul Cartezian</h1>
        <p className="mt-4 text-lg text-gray-300">Calculați produsul cartezian pentru mulțimi date.</p>
      </header>

      <main className="max-w-5xl mx-auto bg-gray-900 p-8 shadow-2xl rounded-lg">
        <div className="flex flex-col md:flex-row gap-12">
          <section className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Introduceți valorile pentru n și mulțimile</h2>

            <div className="mb-6">
              <label htmlFor="n" className="block text-gray-300 font-medium mb-2">n (număr de mulțimi):</label>
              <input
                type="text"
                id="n"
                value={n}
                onChange={(e) => handleNChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-gray-100 font-mono"
                placeholder="Introduceti n"
              />
            </div>

            {n &&
              Array.from({ length: parseInt(n) }).map((_, i) => (
                <div key={i} className="mb-6">
                  <label htmlFor={`setSize${i}`} className="block text-gray-300 font-medium mb-2">
                    Mulțimea {i + 1} (elemente, separate prin spațiu):
                  </label>
                  <input
                    type="text"
                    id={`setSize${i}`}
                    value={sets[i].join(" ")}
                    onChange={(e) => handleSetElementsChange(i, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-gray-100 font-mono"
                    placeholder="Introduceti elemente"
                  />
                </div>
              ))}

            <button
              onClick={generateCartesianProduct}
              className="mt-6 px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Calculează
            </button>
          </section>

          <section className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-100 mb-4">Rezultatul Produsului Cartezian</h2>
            <div className="bg-gray-800 p-6 border border-gray-700 rounded-lg text-gray-100">
              {result.length > 0 ? (
                <p className="text-gray-100">{`{ ${result.join(", ")} }`}</p>
              ) : (
                <p className="text-gray-400">Introduceți valori pentru a calcula produsul cartezian.</p>
              )}
            </div>
          </section>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Ce este Produsul Cartezian?</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-gray-100">
            <p className="text-gray-300 mb-4">
              Produsul cartezian al două sau mai multe mulțimi este o mulțime de tupluri ordonate, în care fiecare tuplu conține exact un element din fiecare mulțime dată. Practic, produsul cartezian combină elementele din mulțimi într-o manieră sistematică, astfel încât fiecare posibilă combinație a acestora să fie inclusă.
            </p>

            <h3 className="text-xl font-semibold text-gray-100 mb-3">Formula generală</h3>
            <p className="text-gray-300 mb-4">
              Dacă avem două mulțimi, <code>A = {'{a1, a2}'}</code> și <code>B = {'{b1, b2}'}</code>, produsul cartezian al acestor mulțimi va fi:
            </p>
            <pre className="bg-gray-700 text-gray-100 p-4 rounded-lg mb-4">
              A × B = {'{(a1, b1), (a1, b2), (a2, b1), (a2, b2)}'}
            </pre>

            <p className="text-gray-300 mb-4">
              În cazul în care avem mai multe mulțimi, produsul cartezian se extinde la toate combinațiile posibile ale elementelor din fiecare mulțime.
            </p>

            <h3 className="text-xl font-semibold text-gray-100 mb-3">Exemplu concret</h3>
            <p className="text-gray-300 mb-4">
              Să presupunem că avem două mulțimi:
            </p>
            <pre className="bg-gray-700 text-gray-100 p-4 rounded-lg mb-4">
              A = {'{1, 2}'}
              <br />
              B = {'{x, y}'}
            </pre>
            <p className="text-gray-300 mb-4">
              Produsul cartezian A × B va fi:
            </p>
            <pre className="bg-gray-700 text-gray-100 p-4 rounded-lg mb-4">
              A × B = {'{(1, x), (1, y), (2, x), (2, y)}'}
            </pre>

            <p className="text-gray-300 mb-4">
              După cum putem observa, produsul cartezian generează toate combinațiile posibile între elementele celor două mulțimi.
            </p>

            <h3 className="text-xl font-semibold text-gray-100 mb-3">Produsul Cartezian pentru mai multe mulțimi</h3>
            <p className="text-gray-300 mb-4">
              Dacă avem mai multe mulțimi, procesul este similar, dar numărul de combinații crește exponențial. De exemplu, pentru trei mulțimi:
            </p>
            <pre className="bg-gray-700 text-gray-100 p-4 rounded-lg mb-4">
              A = {'{1, 2}'}
              <br />
              B = {'{x, y}'}
              <br />
              C = {'{a, b}'}
            </pre>
            <p className="text-gray-300 mb-4">
              Produsul cartezian A × B × C va fi:
            </p>
            <pre className="bg-gray-700 text-gray-100 p-4 rounded-lg mb-4">
              A × B × C = {'{(1, x, a), (1, x, b), (1, y, a), (1, y, b), (2, x, a), (2, x, b), (2, y, a), (2, y, b)}'}
            </pre>

            <p className="text-gray-300 mb-4">
              După cum putem observa, produsul cartezian pentru trei mulțimi generează toate combinațiile posibile între elementele celor trei mulțimi.
            </p>

            <h3 className="text-xl font-semibold text-gray-100 mb-3">Cum se calculează produsul cartezian?</h3>
            <p className="text-gray-300 mb-4">
              Produsul cartezian poate fi calculat manual, prin generarea tuturor combinațiilor între elementele mulțimilor. De asemenea, există algoritmi eficienți care pot ajuta la calcularea acestuia pentru mulțimi de dimensiuni mari. În aplicația noastră, se folosește un algoritm simplu pentru a calcula produsul cartezian al mai multor mulțimi, afișând toate combinațiile posibile ale acestora.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Algoritmul pentru Produsul Cartezian</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-gray-100">
            <pre className="text-sm overflow-x-auto">
              <code>{cartesianAlgorithmCode}</code>
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}
