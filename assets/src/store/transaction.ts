export function addBaseTx({uid, name, lastTable}: any) {
  return {
    ':base/uid': uid,
    ':base/name': name,
    ':base/lastTable': lastTable,
  };
}

export function addFieldTx({uid, name, type, typeOptions}: any) {
  return {
    ':field/uid': uid,
    ':field/name': name,
    ':field/type': type,
    ':field/typeOptions': typeOptions,
  };
}
