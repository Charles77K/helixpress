// import React from 'react';

export default function Editorial() {
  return (
    <div className="bg-white p-8 flex flex-col gap-10">
      <h1 className="text-2xl font-bold text-slate-700">
        The MDPI Editorial Process
      </h1>
      <div>
        <h1 className="text-xl font-bold text-slate-700">Overview</h1>
        <div className="text-xs space-y-4 mt-3">
          <p>
            MDPI operates a rigorous and transparent peer review process that
            aims to maximize quality; it is handled by researchers and scholars.
          </p>
          <p>
            We believe that peer review should be efficient, rigorous, and fair
            for everyone involved.
          </p>
          <p>
            For most MDPI journals, peer review is a single-blind assessment
            with at least two independent reviewers, followed by a final
            acceptance/rejection decision by the Editor-in-Chief or another
            academic editor approved by the Editor-in-Chief. The Editor-in-Chief
            is responsible for the academic quality of the publication process,
            including acceptance decisions; the approval of external editors and
            topics for article collections, such as Special Issues, Topics, and
            Topical Collections; and appointing new Editorial Board members.
          </p>
          <p>
            A summary of the editorial process is given in the flowchart below.
          </p>
          <p className="p-2">
            <img src="/editorial.png" />
          </p>
          <p className="text-center">The MDPI editorial process.</p>
        </div>
      </div>
      {/* 2 */}
      <div>
        <h1 className="text-xl font-bold text-slate-700 italic">Peer Review</h1>
        <div className="text-xs space-y-4 mt-3">
          <p>
            From submission to final decision or publication, one dedicated MDPI
            staff member coordinates the review process and serves as the main
            point of contact for authors, academic editors, and reviewers.
          </p>
          <p>
            The process is single-blind for most journals, meaning that the
            author does not know the identity of the reviewer, but the reviewer
            knows the identity of the author. Some MDPI journals operate
            double-blind peer review, where in addition to the author not
            knowing the identity of the reviewer, the reviewer is unaware of the
            author’s identity. Conference journals
            (https://www.mdpi.com/about/proceedings) operate a different peer
            review standard. The peer review process is handled by the
            conference committee, and the review method as well as the number of
            reports is decided by the conference organizers requirements.
          </p>
          <p>
            At least two review reports are collected for each submitted
            article. The academic editor can suggest reviewers during pre-check.
            Alternatively, MDPI editorial staff will use qualified Editorial
            Board members, qualified reviewers from our database, or new
            reviewers identified by web searches for related articles.
          </p>
        </div>
      </div>
      {/* /3 */}
      <div>
        <h1 className="text-xl font-bold text-slate-700 italic">Peer Review</h1>
        <div className="text-xs space-y-4 mt-3">
          <p>
            MDPI journals allow authors to choose open peer review. Choosing
            open peer review means that review reports and author responses to
            reviewers will be published alongside the manuscript. Publishing the
            reviewer reports and author responses together with the article
            provides greater transparency and trust for readers as they can
            track and check the peer review process. The Open Peer Review model
            also encourages reviewers to provide high quality comments as they
            will be made public if the article is accepted for publication.
          </p>
          <p>
            To promote open communication further and increase the robustness of
            the peer review process, we encourage reviewers to sign their
            reports so that their name appears on the review report (referred to
            as open identity). By signing the reports, reviewers receive direct
            credit for their contribution to the peer review process and also
            shows their commitment towards open science. The default option is
            for reviewers to remain anonymous. If an article is rejected no
            details will be published.
          </p>
          <p>
            MDPI authors have embraced the Open Peer Review model and we have
            seen an increase in published reports since the launch of this
            initiative in 2014. Further information can be found on our blog.
          </p>
        </div>
      </div>
    </div>
  );
}
