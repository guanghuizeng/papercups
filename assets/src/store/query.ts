export const QueryTables =
  '[:find ?id ?n ?o :in $ ?b :where [?be ":base/uid" ?b] [?be ":base/table" ?id] [?te ":table/uid" ?id] [?te ":table/name" ?n] [?te ":table/order" ?o] ]';
export const QueryViews =
  '[:find ?i ?n ?t ?f ?o :in $ ?tn :where [?e ":view/uid" ?i] [?e ":view/name" ?n] [?e ":view/type" ?t] [?e ":view/frozenColumnCount" ?f] [?e ":view/order" ?o] [?te ":table/uid" ?tn] [?te ":table/view" ?i]]';
export const QueryViewForControls =
  '[:find ?f ?g ?s ?rh :in $ ?v :where [?e ":view/uid" ?v] [(get-else $ ?e ":view/filters" {}) ?f] [(get-else $ ?e ":view/groupLevels" []) ?g] [(get-else $ ?e ":view/sorts" {}) ?s] [(get-else $ ?e ":view/rowHeight" "default") ?rh] ]';

export const QueryFieldsForFieldControl =
  '[:find ?e ?o ?y ?i ?n ?vi :in $ ?v :where [?e ":field/uid" ?i] [?e ":field/name" ?n] [?y ":edge/prev" ?v] [?y ":edge/next" ?i] [?y ":edge/order" ?o] [(get-else $ ?y ":edge/visible" true) ?vi]]';
export const QueryFieldsForFilterControl =
  '[:find ?e ?o ?y ?i ?n ?t ?to :in $ ?v :where [?e ":field/uid" ?i] [?e ":field/name" ?n] [?e ":field/type" ?t] [?e ":field/typeOptions" ?to] [?y ":edge/prev" ?v] [?y ":edge/next" ?i] [?y ":edge/order" ?o]]';

export const QueryFields =
  '[:find ?e ?i ?n ?t ?to ?o ?vi ?w ?y :in $ ?v :where [?e ":field/uid" ?i] [?e ":field/name" ?n] [?e ":field/type" ?t] [?e ":field/typeOptions" ?to] [?y ":edge/prev" ?v] [?y ":edge/next" ?i] [?y ":edge/order" ?o] [(get-else $ ?y ":edge/visible" true) ?vi] [(get-else $ ?y ":edge/width" 200) ?w]]';

export const QueryTableFields =
  '[:find ?e ?i ?n ?t ?to :in $ ?v :where [?e ":field/uid" ?i] [?e ":field/name" ?n] [?e ":field/type" ?t] [?e ":field/typeOptions" ?to] [?te ":table/uid" ?v] [?te ":table/fields" ?f]]';

export const QueryFieldsVisible =
  '[:find ?e ?o ?vi :in $ ?v :where [?e ":field/uid" ?i]  [?y ":edge/prev" ?v] [?y ":edge/next" ?i] [?y ":edge/order" ?o] [(get-else $ ?y ":edge/visible" true) ?vi] [(= ?vi true)]]';
export const CountFieldsInvisible =
  '[:find (count ?e) :in $ ?v :where [?e ":field/uid" ?i]  [?y ":edge/prev" ?v] [?y ":edge/next" ?i] [?y ":edge/order" ?o] [(get-else $ ?y ":edge/visible" true) ?vi] [(= ?vi false)]]';

export const QueryRecords =
  '[:find ?e ?i ?o :in $ ?v :where [?e ":record/uid" ?i] [?y ":edge/prev" ?v] [?y ":edge/next" ?i] [?y ":edge/order" ?o]]';
