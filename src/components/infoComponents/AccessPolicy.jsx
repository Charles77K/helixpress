// import React from 'react'

export default function AccessPolicy() {
  return (
    <div>
      <div className="bg-white p-8 flex flex-col gap-10">
        <h1 className="text-2xl font-bold text-slate-700">
          MDPI Open Access Information and Policy
        </h1>
        <div>
          <h1 className="text-xl font-bold text-slate-700">Overview</h1>
          <div className="text-xs space-y-4 mt-3">
            <p>
              All articles published by MDPI are made immediately available
              worldwide under an open access license. This means:
            </p>
            <li>
              everyone has free and unlimited access to the full-text of all
              articles published in MDPI journals;
            </li>
            <li>
              everyone is free to re-use the published material if proper
              accreditation/citation of the original publication is given;
            </li>
            <li>
              open access publication is supported by the authors institutes or
              research funding agencies by payment of a comparatively low
              Article Processing Charge
            </li>
          </div>
        </div>
        {/* 2 */}
        <div>
          <h1 className="text-xl font-bold text-slate-700">Permissons</h1>
          <div className="text-xs space-y-4 mt-3">
            <p>
              No special permission is required to reuse all or part of article
              published by MDPI, including figures and tables. For articles
              published under an open access Creative Common CC BY license, any
              part of the article may be reused without permission provided that
              the original article is clearly cited. Reuse of an article does
              not imply endorsement by the authors or MDPI. Furthermore, no
              special permission is required for authors to submit their work to
              external repositories. This policy extends to all versions of a
              paper: submitted, accepted, and published.
            </p>
          </div>
        </div>
        {/* 3 */}
        <div>
          <h1 className="text-xl font-bold text-slate-700">
            External Open Access Resources
          </h1>
          <div className="text-xs space-y-4 mt-3">
            <p>
              Those who are new to the concept of open access might find the
              following websites or the Open Access Explained! video
              informative:
            </p>
            <li className="font-bold text-xs text-slate-600 hover:underline">
              Wikipedia article on Open Accessexternal link
            </li>
            <li className="font-bold text-xs text-slate-600 hover:underline">
              Open Access Networkexternal link
            </li>
          </div>
        </div>
        {/* 3 */}
        <div>
          <h1 className="text-xl font-bold text-slate-700">
            Advantages of Open Access for Authors
          </h1>
          <div className="text-xs space-y-4 mt-3">
            <p>
              The High Availability and Visibility of our open access articles
              is guaranteed through the free and unlimited accessibility of the
              publication over the Internet. Everyone can freely access and
              download the full text of all articles published with MDPI:
              readers of open access journals, i.e., mostly other researchers,
              do not need to pay any subscription or pay-per-view charges to
              read articles published by MDPI. Open access publications are also
              more likely to be included in search engines and indexing
              databases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
