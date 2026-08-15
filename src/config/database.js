// Simple in-memory DB replacement for Prisma to allow running the API without Prisma.
// NOTE: This is intended for development/testing only and does not persist data.

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const storage = {
	cliente: [],
	prestador: [],
	categoria: [],
	chamado: [],
	avaliacao: []
};

const counters = { cliente: 1, prestador: 1, categoria: 1, chamado: 1, avaliacao: 1 };

const matchWhere = (item, where) => {
	if (!where) return true;
	// support simple equality and nested AND, OR structures
	if (where.OR && Array.isArray(where.OR)) {
		return where.OR.some((sub) => matchWhere(item, sub));
	}
	for (const key of Object.keys(where)) {
		const val = where[key];
		if (typeof val === 'object' && val !== null) {
			// support nested operators like { status: { in: [...] } }
			if (val.in) {
				if (!val.in.includes(item[key])) return false;
			} else if (val.not) {
				if (item[key] === val.not) return false;
			} else if (val.notNull !== undefined) {
				if (val.notNull && item[key] == null) return false;
			} else {
				// fallback equality for nested objects
				if (item[key] !== val) return false;
			}
		} else {
			if (item[key] !== val) return false;
		}
	}
	return true;
};

const applySelect = (item, select) => {
	if (!select) return deepClone(item);
	const out = {};
	for (const k of Object.keys(select)) {
		if (select[k]) out[k] = item[k];
	}
	return out;
};

const db = {
	$connect: async () => { /* no-op for in-memory */ },
	$disconnect: async () => { /* no-op */ },
	$transaction: async (fn) => {
		// Run callback and return result. No real transaction semantics.
		return await fn(db);
	},
	cliente: {
		findUnique: async ({ where }) => storage.cliente.find((c) => c.id === where.id) || null,
		findFirst: async ({ where }) => {
			if (!where) return storage.cliente[0] || null;
			return storage.cliente.find((c) => {
				// support OR array
				if (where.OR) {
					return where.OR.some((cond) => Object.keys(cond).every(k => c[k] === cond[k]));
				}
				return Object.keys(where).every(k => c[k] === where[k]);
			}) || null;
		},
		create: async ({ data }) => {
			const item = { id: counters.cliente++, ...data };
			storage.cliente.push(item);
			return deepClone(item);
		},
		update: async ({ where, data }) => {
			const idx = storage.cliente.findIndex((c) => c.id === where.id);
			if (idx === -1) throw new Error('Not found');
			storage.cliente[idx] = { ...storage.cliente[idx], ...data };
			return deepClone(storage.cliente[idx]);
		},
		delete: async ({ where }) => {
			const idx = storage.cliente.findIndex((c) => c.id === where.id);
			if (idx === -1) throw new Error('Not found');
			const [removed] = storage.cliente.splice(idx, 1);
			return deepClone(removed);
		},
		count: async ({ where }) => storage.cliente.filter((c) => matchWhere(c, where)).length
	},
	prestador: {
		findUnique: async ({ where }) => storage.prestador.find((p) => p.id === where.id) || null,
		findMany: async ({ where = {}, select } = {}) => {
			const results = storage.prestador.filter((p) => matchWhere(p, where)).map(p => applySelect(p, select));
			return deepClone(results);
		},
		create: async ({ data }) => {
			const item = { id: counters.prestador++, disponivel: true, ...data };
			storage.prestador.push(item);
			return deepClone(item);
		},
		update: async ({ where, data }) => {
			const idx = storage.prestador.findIndex((p) => p.id === where.id);
			if (idx === -1) throw new Error('Not found');
			storage.prestador[idx] = { ...storage.prestador[idx], ...data };
			return deepClone(storage.prestador[idx]);
		},
		count: async ({ where }) => storage.prestador.filter((p) => matchWhere(p, where)).length
	},
	categoria: {
		findMany: async () => deepClone(storage.categoria),
		findUnique: async ({ where }) => storage.categoria.find((c) => c.id === where.id) || null,
		create: async ({ data }) => {
			const item = { id: counters.categoria++, ...data };
			storage.categoria.push(item);
			return deepClone(item);
		},
		update: async ({ where, data }) => {
			const idx = storage.categoria.findIndex((c) => c.id === where.id);
			if (idx === -1) throw new Error('Not found');
			storage.categoria[idx] = { ...storage.categoria[idx], ...data };
			return deepClone(storage.categoria[idx]);
		},
		delete: async ({ where }) => {
			const idx = storage.categoria.findIndex((c) => c.id === where.id);
			if (idx === -1) throw new Error('Not found');
			const [removed] = storage.categoria.splice(idx, 1);
			return deepClone(removed);
		},
		count: async ({ where }) => storage.categoria.filter((c) => matchWhere(c, where)).length
	},
	chamado: {
		findMany: async ({ where = {}, include, select } = {}) => {
			const results = storage.chamado.filter((ch) => matchWhere(ch, where)).map(ch => {
				const out = deepClone(ch);
				if (include) {
					if (include.cliente) out.cliente = storage.cliente.find(c => c.id === ch.clienteId) || null;
					if (include.categoria) out.categoria = storage.categoria.find(c => c.id === ch.categoriaId) || null;
					if (include.prestador) out.prestador = storage.prestador.find(p => p.id === ch.prestadorId) || null;
					if (include.avaliacao) out.avaliacao = storage.avaliacao.find(a => a.chamadoId === ch.id) || null;
				}
				return select ? applySelect(out, select) : out;
			});
			return results;
		},
		findUnique: async ({ where, include, select } = {}) => {
			const ch = storage.chamado.find((c) => c.id === where.id) || null;
			if (!ch) return null;
			const out = deepClone(ch);
			if (include) {
				if (include.cliente) out.cliente = storage.cliente.find(c => c.id === ch.clienteId) || null;
				if (include.categoria) out.categoria = storage.categoria.find(c => c.id === ch.categoriaId) || null;
				if (include.prestador) out.prestador = storage.prestador.find(p => p.id === ch.prestadorId) || null;
				if (include.avaliacao) out.avaliacao = storage.avaliacao.find(a => a.chamadoId === ch.id) || null;
			}
			return select ? applySelect(out, select) : out;
		},
		create: async ({ data }) => {
			const item = { id: counters.chamado++, ...data };
			storage.chamado.push(item);
			return deepClone(item);
		},
		update: async ({ where, data }) => {
			const idx = storage.chamado.findIndex((c) => c.id === where.id);
			if (idx === -1) throw new Error('Not found');
			storage.chamado[idx] = { ...storage.chamado[idx], ...data };
			return deepClone(storage.chamado[idx]);
		},
		count: async ({ where }) => storage.chamado.filter((c) => matchWhere(c, where)).length
	},
	avaliacao: {
		findUnique: async ({ where }) => storage.avaliacao.find((a) => a.chamadoId === where.chamadoId) || null,
		create: async ({ data }) => {
			const item = { id: counters.avaliacao++, ...data };
			storage.avaliacao.push(item);
			return deepClone(item);
		},
		update: async ({ where, data }) => {
			const idx = storage.avaliacao.findIndex((a) => a.chamadoId === where.chamadoId);
			if (idx === -1) throw new Error('Not found');
			storage.avaliacao[idx] = { ...storage.avaliacao[idx], ...data };
			return deepClone(storage.avaliacao[idx]);
		}
	}
};

module.exports = db;

