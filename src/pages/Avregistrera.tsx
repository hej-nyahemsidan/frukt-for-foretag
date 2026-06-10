import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Mail } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const Avregistrera = () => {
  const [params] = useSearchParams();
  const initialEmail = (params.get('email') || '').toLowerCase();
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const unsubscribe = async (e: string) => {
    setStatus('loading');
    try {
      const clean = e.trim().toLowerCase();
      if (!clean || !/.+@.+\..+/.test(clean)) {
        setErrorMsg('Ogiltig e-postadress');
        setStatus('error');
        return;
      }
      const { error } = await supabase
        .from('email_unsubscribes')
        .insert({ email: clean, reason: 'user_request' });
      // Duplicate = already unsubscribed, still treat as success
      if (error && !error.message.includes('duplicate')) {
        setErrorMsg(error.message);
        setStatus('error');
        return;
      }
      setStatus('done');
    } catch (err: any) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (initialEmail && /.+@.+\..+/.test(initialEmail)) {
      unsubscribe(initialEmail);
    }
  }, [initialEmail]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <SEOHead title="Avregistrera utskick — Vitaminkorgen" description="Avregistrera dig från Vitaminkorgens e-postutskick." noindex />
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center">
            <Mail className="w-7 h-7 text-sky-700" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">Avregistrera utskick</h1>

        {status === 'done' ? (
          <div className="text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
            <p className="text-slate-700">
              <strong>{email}</strong> har avregistrerats från våra e-postutskick.
            </p>
            <p className="text-sm text-slate-500">Du kommer inte längre få kampanjer från oss.</p>
            <Link to="/"><Button variant="outline">Tillbaka till startsidan</Button></Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-600 text-center mb-6">
              Bekräfta att du vill avregistrera dig från Vitaminkorgens e-postutskick.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="din@email.se"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-4"
            />
            <Button
              onClick={() => unsubscribe(email)}
              disabled={status === 'loading' || !email}
              className="w-full bg-sky-700 hover:bg-sky-800"
            >
              {status === 'loading' ? 'Avregistrerar...' : 'Bekräfta avregistrering'}
            </Button>
            {status === 'error' && (
              <p className="text-sm text-red-600 mt-3 text-center">{errorMsg}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Avregistrera;